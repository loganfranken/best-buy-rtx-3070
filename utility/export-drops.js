import cheerio from 'cheerio';
import moment from 'moment';
import momentTimezone from 'moment-timezone';
import request from 'request';

const url = 'https://www.nowinstock.net/full_historydetails/1483/52924/';

request(url, (error, response, body) => {

    const $ = cheerio.load(response.body);

    // First, let's read in all of the rows and pull out the timestamp/status
    const records = [];
    const $rows = $('table tr');

    $rows.each((i, elem) => {

        // Skip the header row
        if(i === 0)
        {
            return;
        }

        const $row = $(elem);

        // Parse the timestamp
        const rawTimestamp = $row.find('td:nth-child(1)').text();
        const timestamp = moment.tz(rawTimestamp, 'dd MMM DD YYYY - h:mm A Z', 'America/New_York');

        // Parse the status
        const rawStatus = $row.find('td:nth-child(2)').text();
        const status = rawStatus.includes('In Stock') ? 'In Stock' : 'Out of Stock';

        records.push({
            timestamp,
            status
        });

    });

    // Next, let's sort the records
    records.sort((first, second) => ( first.timestamp.isBefore(second.timestamp) ? -1 : 1 ));

    // Next, let's collapse the individual in stock/out of stock records into individual drops,
    // split by day
    const days = [];

    let currDay = null;
    let currDrop = null;

    records.forEach((record) => {

        // We ignore everything before 2021 since the drops only take on their
        // semi-consistent pattern in that year
        if(record.timestamp.isBefore('2021-01-01'))
        {
            return;
        }

        if(record.status === 'In Stock')
        {
            if(currDay === null)
            {
                currDay = {
                    drops: []
                };
            }
            else
            {
                const daysSinceLastDrop = record.timestamp.diff(currDrop.outOfStock, 'days');
                if(daysSinceLastDrop > 0)
                {
                    days.push(currDay);
                    currDay = {
                        drops: []
                    };
                }
            }
            
            currDrop = {
                inStock: record.timestamp
            };
        }
        else
        {
            currDrop.outOfStock = record.timestamp;
            currDay.drops.push(currDrop);
        }

    });

    days.push(currDay);

    console.log(JSON.stringify(days, null, 4));

});