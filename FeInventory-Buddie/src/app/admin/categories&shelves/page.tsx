import React from "react";
import FormElementsOne from "@/components/FormElementsOne";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";

export const metadata: Metadata = {
  title: "Categories Shelves - Form Elements Page",
  description: "Manage and configure categories shelves on admin only page.",
};

const CategoriesShelves = () => {
  return (
    <DefaultLayout>
      <FormElementsOne />
    </DefaultLayout>
  );
};

export default CategoriesShelves;