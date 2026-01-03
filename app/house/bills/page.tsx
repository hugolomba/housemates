import { headers } from "next/dist/server/request/headers";
import AddBillButton from "./add-bill-button";
import { redirect } from "next/dist/client/components/navigation";
import { auth } from "@/lib/auth";
import Bills from "./bills";
import { getBillsByHouseId } from "@/lib/actions/bills-actions";

export default async function BillsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    redirect("/auth");
  }

  const houseBills = await getBillsByHouseId(session.user.houseId!);

  return (
    <div className="w-full">
      <div className="mx-auto max-w-6xl px-4 py-6 space-y-6">
        <header className="space-y-1">
          <h1 className="text-2xl font-semibold">House Bills</h1>
          <p className="text-sm text-default-500">
            Track and manage shared expenses in your house
          </p>
        </header>
        <AddBillButton />
        <Bills houseBills={houseBills} />
      </div>
    </div>
  );
}
