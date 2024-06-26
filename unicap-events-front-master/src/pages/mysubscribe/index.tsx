import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Container, TitlePage, Title, Main } from '../../styles/pages/events/style';
import { TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react';
import { format } from 'date-fns';
import axios from 'axios';

interface SubscribedSubevento {
    sub_event_id: number;
    sub_event_name: string;
    sub_event_description: string;
    sub_event_start_date: string;
    sub_event_end_date: string;
}

export default function Mysubscribe() {
    const [subeventos, setSubeventos] = useState<SubscribedSubevento[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchSubeventos = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                console.error('Token não encontrado.');
                return;
            }

            const response = await axios.get('https://unicap-events-backend.onrender.com/user/my-subscribe', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const subeventosData = response.data.data;
            setSubeventos(subeventosData || []); // Certifique-se de que subeventos é um array
        } catch (error) {
            console.error('Ocorreu um erro ao buscar subeventos:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubeventos();
    }, []);

    return (
        <>
            <Head>
                <title>Unicap Events | Minhas Inscrições</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Main>
                <Container>
                    <TitlePage>
                        <Title>
                            Minhas inscrições
                        </Title>
                    </TitlePage>
                    <div>
                        <TableContainer>
                            <Table variant='simple' colorScheme='red'>
                                <TableCaption>Subeventos do Evento</TableCaption>
                                <Thead>
                                    <Tr>
                                        <Th>Nome</Th>
                                        <Th>Data Inicial</Th>
                                        <Th>Data Final</Th>
                                        <Th>Descrição</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {subeventos.length > 0 ? subeventos.map(subevento => (
                                        <Tr
                                            key={subevento.sub_event_id}
                                            _hover={{ bg: 'red.100', boxShadow: 'md' }}
                                        >
                                            <Td>{subevento.sub_event_name}</Td>
                                            <Td>{format(new Date(subevento.sub_event_start_date), 'dd/MM/yyyy')}</Td>
                                            <Td>{format(new Date(subevento.sub_event_end_date), 'dd/MM/yyyy')}</Td>
                                            <Td>{subevento.sub_event_description}</Td>
                                        </Tr>
                                    )) : (
                                        <Tr>
                                            <Td colSpan={6}>Nenhum subevento encontrado.</Td>
                                        </Tr>
                                    )}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </div>
                </Container>
            </Main>
        </>
    );
}
