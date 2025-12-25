"use client";
import { House } from "@/prisma/generated/client";
import {
  Accordion,
  AccordionItem,
  Avatar,
  AvatarGroup,
  Button,
  Card,
  CardBody,
  CardFooter,
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Alert,
} from "@heroui/react";
import { Payload } from "@prisma/client/runtime/client";
import HouseInfoTable from "./house-info-table";

import {
  ClipboardList,
  House as HouseIcon,
  MoonIcon,
  ReceiptEuro,
  TriangleAlert,
} from "lucide-react";

export default function HouseMain({ house }: Payload<House>) {
  console.log(house.alerts);

  const defineAlertColor = (alertPriority: string) => {
    switch (alertPriority) {
      case "URGENT":
      case "HIGH":
        return "danger";

      case "MEDIUM":
      case "LOW":
        return "warning";

      default:
        return "primary";
    }
  };

  const defineAlertVariant = (alertPriority: string) => {
    switch (alertPriority) {
      case "URGENT":
        return "solid";

      case "MEDIUM":
      case "HIGH":
        return "faded";

      case "LOW":
        return "flat";

      default:
        return undefined;
    }
  };

  return (
    <Card fullWidth>
      <CardBody className="flex flex-col items-center justify-center">
        <HouseIcon />
        <h1 className="text-2xl font-bold">{house.name}</h1>
        <p className="text-center text-sm text-muted-foreground">
          {house.address}
        </p>
        <div className="users-group-div flex flex-col items-center gap-4">
          <AvatarGroup
            max={3}
            total={house.users.length}
            renderCount={(count) => (
              <p className="text-small text-foreground font-medium ms-2">
                +{count - 3} other{count - 3 === 1 ? "" : "s"}
              </p>
            )}
            isBordered
            className="mt-4"
          >
            {house.users.map((user) => (
              <Avatar size="sm" key={user.id} src={user.image || undefined} />
            ))}
          </AvatarGroup>
          <Button size="sm" variant="flat" color="success" radius="full">
            Invite
          </Button>
        </div>
      </CardBody>
      <CardFooter className="px-2">
        <Accordion
          variant="splitted"
          className="flex flex-col gap-2"
          disableIndicatorAnimation
        >
          <AccordionItem
            key="1"
            aria-label="Alerts"
            title={
              <p className="text-foreground/90 font-bold">
                Alerts ({house.alerts.length})
              </p>
            }
            indicator={<TriangleAlert color="#ff0000" />}
            // className="bg-red-600/20"
          >
            <div className="flex flex-col gap-2">
              {house.alerts.map((alert) => (
                <Alert
                  description={alert.description}
                  title={alert.title}
                  key={alert.id}
                  color={defineAlertColor(alert.priority)}
                  variant={defineAlertVariant(alert.priority)}
                  endContent={
                    <Button
                      size="sm"
                      //   variant={defineAlertVariant(alert.priority)}
                      variant="flat"
                      color="default"
                      //   color={defineAlertColor(alert.priority)}
                    >
                      Mark as Solved
                    </Button>
                  }
                />
              ))}
            </div>

            {/* <HouseInfoTable infos={house.infos} /> */}
            {/* <div className="flex flex-col gap-4">
              {house.infos.map((info) => (
                <Card key={info.id}>
                  <CardBody className="flex justify-between items-center">
                    <p className="font-medium">{info.key}</p>
                    <p className="text-muted-foreground">{info.value}</p>
                  </CardBody>
                </Card>
              ))}
            </div> */}
          </AccordionItem>
          <AccordionItem
            key="2"
            aria-label="Upcoming bills"
            title="Upcoming bills"
            indicator={<ReceiptEuro />}
          ></AccordionItem>

          <AccordionItem
            key="3"
            aria-label="Upcoming Tasks"
            title="Upcoming Tasks"
            indicator={<ClipboardList />}
          ></AccordionItem>
        </Accordion>

        {/* <Button size="sm" variant="outline" fullWidth>
          View House Details
        </Button> */}
      </CardFooter>
    </Card>
  );
}
