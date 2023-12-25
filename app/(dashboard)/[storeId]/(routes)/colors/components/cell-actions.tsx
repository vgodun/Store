'use client';

import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertModal } from "@/components/modals/alert-modal";
import { useParams, useRouter } from "next/navigation";
import { ColorColumn } from "./columns";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface CellActionProps {
    data: ColorColumn;
}

export const CellAction = ({ data }: CellActionProps) => {

    const router = useRouter();
    const params = useParams();

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast.success('Color Id copied to the clipboard');
    }

    const onConfirm = async () => {
        try {
          setLoading(true);
          await axios.delete(`/api/${params.storeId}/colors/${data.id}`);
          toast.success('Color deleted.');
          router.refresh();
        } catch (error: any) {
          toast.error('Make sure you removed all products using this color first.');
        } finally {
          setLoading(false);
          setOpen(false);
        }
      }
      return (
        <>
          <AlertModal 
            isOpen={open} 
            onClose={() => setOpen(false)}
            onConfirm={onConfirm}
            loading={loading}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => onCopy(data.id)}
              >
                <Copy className="mr-2 h-4 w-4" /> Copy Id
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => router.push(`/${params.storeId}/colors/${data.id}`)}
              >
                <Edit className="mr-2 h-4 w-4" /> Update
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setOpen(true)}
              >
                <Trash className="mr-2 h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
}