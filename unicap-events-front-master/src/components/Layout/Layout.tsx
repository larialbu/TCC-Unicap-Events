import React, { useEffect, useRef } from "react";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { SideBar } from "../SideBar/SideBar";
import { WrapperSideBar, Container } from "./styles";

interface ILayout {
    children: React.ReactNode;
    showLayout: boolean;
}

const Layout: React.FC<ILayout> = ({ children, showLayout }) => {
    const { asPath } = useRouter();
    const refContainer = useRef<null | HTMLDivElement>(null);
    const userPermission = typeof window !== 'undefined' ? localStorage.getItem('permission') : null; 

    useEffect(() => {
        refContainer?.current?.scroll({
            top: 0,
            behavior: "smooth",
        });
    }, [asPath]);

    const isRegisterPage = asPath === '/register'; 
    const isLoginPage = asPath === '/login';

    const shouldShowSidebar = typeof window !== 'undefined' && showLayout && !isLoginPage && !isRegisterPage && userPermission !== '' && userPermission !== null; // Verifica se está no navegador antes de acessar o localStorage

    return (
        <div>
            {shouldShowSidebar && (
                <Box>
                    <Box ref={refContainer}>
                        <Box>
                            <Container>
                                <WrapperSideBar>
                                    <SideBar permissions={userPermission!} /> 
                                </WrapperSideBar>

                                <WrapperSideBar>
                                    <img src="/unicap-events.jpg" alt="Descrição da imagem " />
                                </WrapperSideBar>
                            </Container>
                        </Box>
                        <Box>{children}</Box>
                    </Box>
                </Box>
            )}
            {!shouldShowSidebar && <div>{children}</div>} 
        </div>
    );
};

export default Layout;
