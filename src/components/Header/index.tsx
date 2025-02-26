import { Flex, Text, Link } from "@radix-ui/themes";

import Image from "next/image";
export default function Header() {
  return (
    <Flex
      direction="row"
      align="center"
      justify="between"
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        backgroundColor: "var(--primary-pink)",
        padding: "1rem",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        zIndex: 1000,
      }}
    >
      <Link href="/">
        <Flex align="center" justify="center" direction="row">
          <Image src="/logo.svg" alt="logo" height={50} width={50} />
          <Text weight="bold"> PetMap</Text>
        </Flex>
      </Link>
      <Flex>
        <Link href="/Cadastrar" style={{ marginRight: "1rem" }}>
          Cadastrar animal
        </Link>
        <Link href="/Painel">
          <Text>Login</Text>
        </Link>
      </Flex>
    </Flex>
  );
}
