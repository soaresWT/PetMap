import { Flex, Text, Link } from "@radix-ui/themes";

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
        backgroundColor: "white",
        padding: "1rem",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        zIndex: 1000,
      }}
    >
      <Text>
        <Link href="/">PetMap</Link>
      </Text>
    </Flex>
  );
}
