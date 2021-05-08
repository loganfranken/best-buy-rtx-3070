import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell } from "@material-ui/core"
import * as moment from 'moment'
import * as React from 'react'

import DropDay from './interfaces/DropDay'

interface Props {
    days: DropDay[]
}

export default ({ days }: Props) => <TableContainer>
    <Table width="100%">
        <TableHead>
            <TableRow>
                <TableCell>Day</TableCell>
                <TableCell>Weekday</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Length</TableCell>
                <TableCell>Diff</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {days.map(({ date, weekday, drops, daysSinceLastDrop }) =>
                <React.Fragment>
                    <TableRow>
                        <TableCell rowSpan={drops.length}>{date}</TableCell>
                        <TableCell rowSpan={drops.length}>{weekday}</TableCell>
                        <TableCell>{moment(drops[0].inStock).format('h:mm A')} - {moment(drops[0].outOfStock).format('h:mm A')}</TableCell>
                        <TableCell>{drops[0].dropLength} minutes</TableCell>
                        <TableCell>{daysSinceLastDrop == 0 ? '--' : `${daysSinceLastDrop} days`}</TableCell>
                    </TableRow>
                    {drops.slice(1).map(({ inStock, outOfStock, minutesSinceLastDrop, dropLength }) =>
                        <TableRow>
                            <TableCell>{moment(inStock).format('H:mm A')} - {moment(outOfStock).format('H:mm A')}</TableCell>
                            <TableCell>{dropLength} minutes</TableCell>
                            <TableCell>
                                {minutesSinceLastDrop > 60
                                    ? `${Math.floor(minutesSinceLastDrop/60)} hour ${minutesSinceLastDrop%60} minutes`
                                    : `${minutesSinceLastDrop} minutes`
                                }
                            </TableCell>
                        </TableRow>
                    )}
                </React.Fragment>
            )}
        </TableBody>
    </Table>
</TableContainer>