"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
  Divider,
  Chip,
} from "@heroui/react";

interface Share {
  id: string;
  userName: string;
  amount: number;
  paid: boolean;
}

interface Bill {
  id: string;
  title: string;
  amount: number;
  dueDate: string;
  shares: Share[];
}

export default function BillDetailsModal({
  bill,
  isOpen,
  setIsOpen,
}: {
  bill: Bill;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) {
  return (
    <Modal isOpen={isOpen} onOpenChange={setIsOpen} placement="center">
      <ModalContent className="p-4">
        <ModalHeader>{bill.title}</ModalHeader>

        <div className="space-y-3">
          <p className="text-sm text-gray-500">
            Total: €{bill.amount.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500">
            Due: {new Date(bill.dueDate).toLocaleDateString()}
          </p>

          <Divider />

          <div className="space-y-2">
            {bill.shares.map((share) => (
              <div key={share.id} className="flex justify-between items-center">
                <span>{share.userName}</span>
                <span>€{share.amount.toFixed(2)}</span>
                {share.paid ? (
                  <Chip size="sm" variant="flat" color="success">
                    Paid
                  </Chip>
                ) : (
                  <Chip size="sm" variant="flat" color="warning">
                    Pending
                  </Chip>
                )}
              </div>
            ))}
          </div>
        </div>

        <ModalFooter className="mt-4 flex justify-end">
          <Button variant="flat" onPress={() => setIsOpen(false)}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
