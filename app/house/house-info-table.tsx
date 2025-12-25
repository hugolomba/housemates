"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Button,
} from "@heroui/react";

import { useState } from "react";
import { Eye, EyeOff, Copy } from "lucide-react";

type HouseInfo = {
  id: number;
  key: string;
  value: string;
};

type Props = {
  infos: HouseInfo[];
};

const columns = [
  { key: "label", label: "Field" },
  { key: "email", label: "Value" },
  { key: "value", label: "Value" },
];

export default function HouseInfoTable({ infos }: Props) {
  const [visiblePasswords, setVisiblePasswords] = useState<
    Record<number, boolean>
  >({});

  const rows = infos.map((info) => ({
    id: info.id,
    label: info.key,
    value: info.value,
    isPassword: info.key === "wifiPassword",
  }));

  return (
    <Table aria-label="House information">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>

      <TableBody items={rows} emptyContent="No information available">
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>
                {columnKey === "value" && item.isPassword ? (
                  <div className="flex items-center gap-2">
                    <span>
                      {visiblePasswords[item.id] ? item.value : "••••••••"}
                    </span>

                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      onPress={() =>
                        setVisiblePasswords((prev) => ({
                          ...prev,
                          [item.id]: !prev[item.id],
                        }))
                      }
                    >
                      {visiblePasswords[item.id] ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </Button>

                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      onPress={() => navigator.clipboard.writeText(item.value)}
                    >
                      <Copy size={16} />
                    </Button>
                  </div>
                ) : (
                  getKeyValue(item, columnKey)
                )}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
