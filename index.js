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
    const maxRowIndex = $rows.length - 1;

    $rows.each((i, elem) => {

        // Skip the header row and the last row (since it's just the first
        // time the card was out of stock)
        if(i === 0 || i === maxRowIndex)
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

    // Next, let's collapse the individual in stock/out of stock records into 
    const instances = [];
    let currInstance = null;

    records.forEach((record) => {

        if(record.status === 'In Stock')
        {
            currInstance = {
                inStock: record.timestamp
            };
        }
        else
        {
            currInstance.outOfStock = record.timestamp;
            instances.push(currInstance);
        }

    });

});