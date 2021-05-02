import DropDay from './interfaces/DropDay'
import * as React from 'react'
import { TableContainer, TableHead, TableBody, TableRow, TableCell } from "@material-ui/core"

export default (days: DropDay[]) => <TableContainer>
    <TableHead>
        <TableRow>
            <TableCell>Day</TableCell>
            <TableCell>Weekday</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Diff</TableCell>
        </TableRow>
    </TableHead>
    <TableBody>
        {days.map((day: DropDay) =>
            <TableRow>
                
            </TableRow>
        )}
    </TableBody>
</TableContainer>