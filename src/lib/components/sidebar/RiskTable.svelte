<script>
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Tabs, TabItem  } from 'flowbite-svelte';
    export let fireRisk = "High risk";
</script>

<Table>
    <TableHead>
        <TableHeadCell></TableHeadCell>
        <TableHeadCell>Rating</TableHeadCell>
        <TableHeadCell>Trend</TableHeadCell>
    </TableHead>
    <TableBody tableBodyClass="divide-y">
        <TableBodyRow>
        <TableBodyCell>Heat risk</TableBodyCell>
        <TableBodyCell><span class="bg-red-100 text-red-800 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md dark:bg-red-900 dark:text-red-300">
            {fireRisk}
        </span></TableBodyCell>
        <TableBodyCell></TableBodyCell>
        </TableBodyRow>
        <TableBodyRow>
        <TableBodyCell>
            Flood risk
        </TableBodyCell>
        <TableBodyCell>
            <span class="bg-orange-100 text-orange-800 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md dark:bg-orange-900 dark:text-orange-300">
            Moderate risk
            </span>
        </TableBodyCell>
        <TableBodyCell></TableBodyCell>
        </TableBodyRow>
        <TableBodyRow>
        <TableBodyCell>Fire risk</TableBodyCell>
        <TableBodyCell><span class="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md dark:bg-green-900 dark:text-green-300">
            Reduced risk
        </span></TableBodyCell>
        <TableBodyCell></TableBodyCell>
        </TableBodyRow>
    </TableBody>
</Table>