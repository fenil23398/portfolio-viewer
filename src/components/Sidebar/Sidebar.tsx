import {
  Accordion,
  AccordionItem,
  Flex,
  AccordionButton,
  AccordionIcon,
  Box,
  AccordionPanel,
  Text,
} from "@chakra-ui/react";
import { sidebarData } from "src/constants";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathName = usePathname();
  return (
    <Flex
      flexDir="column"
      bg="#191B2A"
      border="1px solid"
      borderColor="#26293F"
      p="16px 0"
      minW="200px"
      color="#9195BB"
    >
      <Accordion allowToggle>
        {sidebarData.map((data) => {
          return (
            <AccordionItem key={data.title}>
              <AccordionButton
                color="white"
                p="0 8px"
                h="32px"
                justifyContent="space-between"
              >
                <Flex alignItems="center" gap="8px">
                  {data.iconUrl && (
                    <Image
                      src={data.iconUrl}
                      alt="img"
                      height="16"
                      width="16"
                    />
                  )}
                  <Box
                    as="span"
                    flex="1"
                    textAlign="left"
                    px="8px"
                    color={"#8F7DF8"}
                  >
                    {data.title}
                  </Box>
                </Flex>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel mt="8px">
                <Flex flexDir="column">
                  {data.children.map((item) => (
                    <Box
                      h="32px"
                      pl="40px"
                      _hover={{
                        bg: "#26293F",
                        color: "white",
                      }}
                      key={item.title}
                      cursor={item.isComingSoon ? "not-allowed" : "pointer"}
                    >
                      <Text
                        fontWeight="600"
                        fontSize="14px"
                        lineHeight="28px"
                        color={pathName === item.path ? "#8F7DF8" : "inherit"}
                      >
                        {item.title}
                      </Text>
                    </Box>
                  ))}
                </Flex>
              </AccordionPanel>
            </AccordionItem>
          );
        })}
      </Accordion>
    </Flex>
  );
};

export default Sidebar;
