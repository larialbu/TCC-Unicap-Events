import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Container, TitlePageId, TitleId, Main } from '../../styles/pages/events/style';
import { Button, Spinner, Flex, Table, Thead, Tbody, Tr, Th, Td, TableContainer, TableCaption } from '@chakra-ui/react';
import { format } from 'date-fns';
import ModalPickTicket from '@/components/Modals/ModalPickTicket';

interface Subevento {
    id: number;
    name: string;
    description: string;
    start_date: string;
    end_date: string;
    tickets_available:number;
    address: {
        block: string;
        room: string;
    };
    tickets: Array<{
        status: string;
    }>;
}

interface Evento {
    id: number;
    name: string;
    start_date: string;
    end_date: string;
    description: string;
}

const EventoDetailsPage: React.FC = () => {
    const [evento, setEvento] = useState<Evento | null>(null);
    const [subeventos, setSubeventos] = useState<Subevento[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedSubEvent, setSelectedSubEvent] = useState<Subevento | null>(null);
    const router = useRouter();
    const { id } = router.query;

    const fetchEventoPrincipal = async (token: string, eventId: number) => {
        setLoading(true);
        try {
            const eventoResponse = await axios.get(`https://unicap-events-backend.onrender.com/event/${eventId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const eventoData = eventoResponse.data.data;
            setEvento(eventoData);
        } catch (error) {
            console.error('Ocorreu um erro ao buscar detalhes do evento:', error);
            router.push('/login');
        } finally {
            setLoading(false);
        }
    };

    const fetchSubeventos = async (token: string, eventId: number) => {
        setLoading(true);
        try {
            const subeventosResponse = await axios.get(`https://unicap-events-backend.onrender.com/sub-event?eventId=${eventId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const subeventosData = subeventosResponse.data.data;
            setSubeventos(subeventosData || []); // Certifique-se de que subeventos é um array
        } catch (error) {
            console.error('Ocorreu um erro ao buscar subeventos:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const expiration = localStorage.getItem('expiration');

        if (!token || !expiration || new Date(expiration) <= new Date()) {
            router.push('/login');
        } else if (id) {
            fetchEventoPrincipal(token, Number(id));
            fetchSubeventos(token, Number(id));
        }
    }, [id]);

    const handleOpenModal = (subEvent: Subevento) => {
        setSelectedSubEvent(subEvent);
        setIsModalOpen(true);
    };

    if (loading || !evento) {
        return (
            <Flex justify="center" align="center" height="100vh">
                <Spinner
                    thickness='10px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    width={150}
                    height={150}
                    color='red.500'
                />
            </Flex>
        );
    }

    return (
        <>
            <Head>
                <title>{evento.name} | SubEventos disponíveis</title>
                <meta name="description" content="Detalhes do Evento" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Main>
                <Container>
                    <div>
                        <TitlePageId>
                            <TitleId>
                                {evento.name}
                            </TitleId>
                            {evento.start_date && <p><strong>Data e Hora Inicial:</strong> {format(new Date(evento.start_date), 'dd/MM/yyyy')}</p>}
                            {evento.end_date && <p><strong>Data e Hora Final:</strong>{format(new Date(evento.end_date), 'dd/MM/yyyy')}</p>}
                            <p><strong>Descrição:</strong> {evento.description}</p>
                        </TitlePageId>
                    </div>
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
                                        <Th>Localização</Th>
                                        <Th>Ingressos Disponíveis</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {subeventos.length > 0 ? subeventos.map(subevento => (
                                        <Tr
                                            key={subevento.id}
                                            _hover={{ bg: 'red.100', boxShadow: 'md' }}
                                            onClick={() => handleOpenModal(subevento)}
                                        >
                                            <Td>{subevento.name}</Td>
                                            <Td>{format(new Date(subevento.start_date), 'dd/MM/yyyy')}</Td>
                                            <Td>{format(new Date(subevento.end_date), 'dd/MM/yyyy')}</Td>
                                            <Td>{subevento.description}</Td>
                                            <Td>{`Bloco: ${subevento.address.block} Sala: ${subevento.address.room}`}</Td>
                                            <Td>{subevento.tickets_available}</Td>
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
            {selectedSubEvent && (
                <ModalPickTicket
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    subEvent={selectedSubEvent}
                />
            )}
        </>
    );
};

export default EventoDetailsPage;
