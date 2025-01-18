import { Flex } from "@radix-ui/themes";
import Header from "../Header";

import { ReactNode } from "react";

const CommonWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <Flex direction="column" style={{ minHeight: "100vh" }}>
      <Header />
      <Flex direction="column" style={{ marginTop: "4rem", flex: 1 }}>
        {children}
      </Flex>
    </Flex>
  );
};

export default CommonWrapper;
