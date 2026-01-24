import HouseMain from "@/app/house/house-main";
import { getDemoHouse, getHouseById } from "@/lib/actions/house-actions";
import { DemoProvider, useDemo } from "@/lib/demo-context";

export default async function DemoPage() {
  //   const { addBill, addTask, addAlert, addCredential } = useDemo();

  const house = await getDemoHouse(); // demo house

  return (
    <HouseMain
      house={house}
      //   actions={{ addBill, addTask, addAlert, addCredential }}
    />
  );
}
