'use client';

import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { OrderColumn, columns } from "./columns";

interface OrderClientProps {
  data: OrderColumn[];
}

export default function OrderClient({data}: OrderClientProps) {
  return (
    <>
        <Heading 
        title={`Orders (${data.length})`}
        description="Manage order for your store."
        />
    <Separator />
    <DataTable searchKey="products" columns={columns} data={data} />
    </>
  )
}
