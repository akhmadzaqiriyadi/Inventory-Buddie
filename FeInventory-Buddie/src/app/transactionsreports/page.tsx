import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TebleTransactionsReports from "@/components/Tables/TebleTransactionsReports";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";

export const metadata: Metadata = {
  title: "Next.js Tables Page | NextAdmin - Next.js Dashboard Kit",
  description: "This is Next.js Tables page for NextAdmin Dashboard Kit",
};

const AccountsPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Products" />
      <div className="flex flex-col gap-10">
        <TebleTransactionsReports />
      </div>
    </DefaultLayout>
  );
};

export default AccountsPage;
