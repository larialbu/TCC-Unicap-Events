import React from 'react';
import { useRouter } from 'next/router';
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    useDisclosure,
    Icon
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons'; 
import { Header, IconExit, Text } from "../SideBar/styles";

interface SideBarProps {
    permissions: string;
}

export function SideBar({ permissions }: SideBarProps) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef<HTMLButtonElement>(null);
    const navigation = useRouter();

    const superAdmin =    [
        { label: "Início", path: "/" },
        { label: "Participantes", path: "/user" },
        { label: "Eventos", path: "/events" },
        { label: "Credenciamento", path: "/creditation" },
        { label: "Eventos Disponíveis", path: "/eventsUser" },
        { label: "Minhas Inscrições", path: "/mysubscribe" },
    ];

    const admin = [
        { label: "Início", path: "/" },
        { label: "Credenciamento", path: "/creditation" },
        { label: "Eventos Disponíveis", path: "/eventsUser" },
        { label: "Minhas Inscrições", path: "/mysubscribe" },
    ];

    const participante = [
        { label: "Início", path: "/" },
        { label: "Eventos Disponíveis", path: "/eventsUser" },
        { label: "Minhas Inscrições", path: "/mysubscribe" },
    ];

    const handleLogout = () => {
        try {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('expiration');
            localStorage.removeItem('permission');
            navigation.push('/login');
        } catch (error) {
            console.error("logout error", error);
        }
    };

    // Decide qual conjunto de links exibir com base nas permissões
    let links: { label: string; path: string; }[] = [];
    if (permissions == "SuperAdmin") {
        links = superAdmin;
    } else if (permissions == "Admin") {
        links = admin;
    } else if (permissions == "Participante") {
        links = participante;
    }

    return (
        <>
            <Button ref={btnRef} colorScheme='white' bg='white' onClick={onOpen}>
                <Icon as={HamburgerIcon} color='#6A0014' />
            </Button>
            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent
                    style={{
                        borderRadius: '10px',
                        margin: '10px'
                    }}>
                    <IconExit>
                        <DrawerCloseButton />
                    </IconExit>
                    <DrawerHeader>
                        <Header>
                            <p>Unicap Events</p>
                        </Header>
                    </DrawerHeader>

                    <DrawerBody>
                        {links.map((item, index) => (
                            <Text
                                key={index}
                                color="#404040"
                                className="text"
                                onClick={() => {
                                    navigation.push(item.path), onClose();
                                }}
                            >
                                {item.label}
                            </Text>
                        ))}
                    </DrawerBody>

                    <DrawerFooter>
                        <Button
                            variant="solid"
                            bg="#6A0014"
                            color="white"
                            mt={16}
                            _hover={{ bg: 'red.500' }}
                            onClick={handleLogout}
                        >
                            Sair
                        </Button>
                    </DrawerFooter>

                </DrawerContent>
            </Drawer>
        </>
    )
}
