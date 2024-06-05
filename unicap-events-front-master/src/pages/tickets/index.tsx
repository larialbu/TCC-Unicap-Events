import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Table, Thead, Tbody, Tr, Th, Td, Spinner, Flex, TableContainer, TableCaption, Button, useToast } from '@chakra-ui/react';
import { Container, TitlePage, Main, Title } from '../../styles/pages/events/style';
import Head from 'next/head';

const TicketsPage: React.FC = () => {
    const [tickets, setTickets] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const { subEventId } = router.query;
    const toast = useToast(); // Usado para exibir o alerta

    useEffect(() => {
        const fetchTickets = async () => {
            if (!subEventId) return;
            setLoading(true);
            try {
                const token = localStorage.getItem('accessToken');
                const response = await axios.get(`https://unicap-events-backend.onrender.com/sub-event/${subEventId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setTickets(response.data.data.tickets);
            } catch (error) {
                console.error('Ocorreu um erro ao buscar os tickets:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTickets();
    }, [subEventId]);

    const handleAccreditation = async (codigoIngresso: string) => {
        try {
            const token = localStorage.getItem('accessToken');
            await axios.put(`https://unicap-events-backend.onrender.com/accreditation/${codigoIngresso}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast({
                title: 'Credenciamento realizado com sucesso!',
                description: 'O usuário foi credenciado com sucesso.',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'top-right',
            });
        } catch (error) {
            console.error('Ocorreu um erro ao realizar o credenciamento:', error);
            alert('Erro ao realizar o credenciamento');
        }
    };

    return (
        <>
            <Head>
                <title>Credenciamento de Tickets</title>
                <meta name="description" content="Credenciamento de tickets para subeventos" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Main>
                <Container>
                    <TitlePage>
                        <Title>Credenciamento</Title>
                    </TitlePage>
                    {loading ? (
                        <Flex justify="center" align="center" height="60px">
                            <Spinner size="xl" color="red.500" />
                        </Flex>
                    ) : (
                        <TableContainer>
                            <Table variant="simple" colorScheme="red">
                                <TableCaption>Tabela de Tickets</TableCaption>
                                <Thead>
                                    <Tr>
                                        <Th>Nome do Usuário</Th>
                                        <Th>Email</Th>
                                        <Th>Código do Ticket</Th>
                                        <Th>Ação</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {tickets.map(ticket => (
                                        <Tr key={ticket.id}>
                                            <Td>{ticket.user ? ticket.user.name : 'N/A'}</Td>
                                            <Td>{ticket.user ? ticket.user.email : 'N/A'}</Td>
                                            <Td>{ticket.codigo_ingresso}</Td>
                                            <Td>
                                                <Button onClick={() => handleAccreditation(ticket.codigo_ingresso)} colorScheme="red">Credenciar</Button>
                                            </Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    )}
                </Container>
            </Main>
        </>
    );
};

export default TicketsPage;
