import DropDay from './interfaces/DropDay'
import * as moment from 'moment'
import * as React from 'react'
import { TableContainer, TableHead, TableBody, TableRow, TableCell } from "@material-ui/core"

interface Props {
    days: DropDay[]
}

export default ({ days }: Props) => <TableContainer>
    <TableHead>
        <TableRow>
            <TableCell>Day</TableCell>
            <TableCell>Weekday</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Diff</TableCell>
        </TableRow>
    </TableHead>
    <TableBody>
        {days.map(({ date, weekday, drops, daysSinceLastDrop }) =>
            <React.Fragment>
                <TableRow>
                    <TableCell rowSpan={drops.length}>{date}</TableCell>
                    <TableCell rowSpan={drops.length}>{weekday}</TableCell>
                    <TableCell>{moment(drops[0].inStock).format('H:mm A')}</TableCell>
                    <TableCell>{daysSinceLastDrop == 0 ? '--' : `${daysSinceLastDrop} days`}</TableCell>
                </TableRow>
                {drops.slice(1).map(({ inStock, minutesSinceLastDrop }) =>
                    <TableRow>
                        <TableCell>{moment(inStock).format('H:mm A')}</TableCell>
                        <TableCell>{minutesSinceLastDrop} minutes</TableCell>
                    </TableRow>
                )}
            </React.Fragment>
        )}
    </TableBody>
</TableContainer>