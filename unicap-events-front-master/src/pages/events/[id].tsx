import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Container, TitlePageId, TitleId, Main } from '../../styles/pages/events/style';
import { Button, Spinner, Flex, Table, Thead, Tbody, Tr, Th, Td, TableContainer, TableCaption } from '@chakra-ui/react';
import { format } from 'date-fns';
import EventoDetails from '@/components/Modals/ModalEvents';
import ModalCreateSubEvents from '@/components/Modals/ModalCreateSubEvents';
import ModalEditSubEvent from '@/components/Modals/ModalSubEvents';

interface Subevento {
    event: any;
    id: number;
    name: string;
    description: string;
    start_date: string;
    end_date: string;
    quantity: number;
    tickets_available: number;
    address: {
        block: string;
        room: string;
    };
    tickets: Array<{
        id: number;
        user_id: number | null;
        status: string;
        codigo_ingresso: string;
        user: {
            id: number;
            name: string;
            email: string;
        } | null;
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
    const [isSubEventModalOpen, setIsSubEventModalOpen] = useState<boolean>(false); 
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [selectedSubEventId, setSelectedSubEventId] = useState<number | null>(null);
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

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleOpenSubEventModal = () => {
        setIsSubEventModalOpen(true);
    };

    const handleCloseSubEventModal = () => {
        setIsSubEventModalOpen(false);
    };

    const handleUpdateSubEvents = () => {
        const token = localStorage.getItem('accessToken');
        if (token && id) {
            fetchSubeventos(token, Number(id));
        }
    };

    const handleOpenEditModal = (subEventId: number) => {
        setSelectedSubEventId(subEventId);
        setIsEditModalOpen(true);
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
                <title>{evento.name} | Detalhes do Evento</title>
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
                            {evento.start_date && <p>Data e Hora Inicial: {format(new Date(evento.start_date), 'dd/MM/yyyy')}</p>}
                            {evento.end_date && <p>Data e Hora Final: {format(new Date(evento.end_date), 'dd/MM/yyyy')}</p>}
                            <p>Descrição: {evento.description}</p>
                        </TitlePageId>
                        <Flex>
                            <Button bg="#6A0014" color="white" _hover={{ bg: 'red.500' }} onClick={handleOpenModal} mr={4}>Editar evento</Button>
                            <Button bg="#6A0014" color="white" _hover={{ bg: 'red.500' }} onClick={handleOpenSubEventModal}>Adicionar sub-evento</Button>
                        </Flex>
                    </div>
                    <div>
                        <TableContainer>
                            {loading ? (
                                <Flex justify="center" align="center" height="600px">
                                    <Spinner
                                        thickness='10px'
                                        speed='0.65s'
                                        emptyColor='gray.200'
                                        width={150}
                                        height={150}
                                        color='red.500' />
                                </Flex>
                            ) : (
                                <Table variant='simple' colorScheme='red'>
                                    <TableCaption>Subeventos do Evento</TableCaption>
                                    <Thead>
                                        <Tr>
                                            <Th>Nome</Th>
                                            <Th>Data Inicial</Th>
                                            <Th>Data Final</Th>
                                            <Th>Descrição</Th>
                                            <Th>Localização</Th>
                                            <Th>Ingressos</Th>
                                            <Th>Ingressos Disponíveis</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {subeventos.length > 0 ? subeventos.map(subevento => (
                                                <Tr
                                                key={subevento.id}
                                                _hover={{ bg: 'red.100', boxShadow: 'md' }}
                                                onClick={() => handleOpenEditModal(subevento.id)}
                                            >
                                                <Td>{subevento.name}</Td>
                                                <Td>{format(new Date(subevento.start_date), 'dd/MM/yyyy')}</Td>
                                                <Td>{format(new Date(subevento.end_date), 'dd/MM/yyyy')}</Td>
                                                <Td>{subevento.description}</Td>
                                                <Td>{`Bloco: ${subevento.address.room}, Sala: ${subevento.address.block}`}</Td>
                                                <Td>{subevento.quantity}</Td>
                                                <Td>{subevento.tickets_available}</Td>
                                            </Tr>
                                        )) : (
                                            <Tr>
                                                <Td colSpan={7}>Nenhum subevento encontrado.</Td>
                                            </Tr>
                                        )}
                                    </Tbody>
                                </Table>
                            )}
                        </TableContainer>
                    </div>
                </Container>
            </Main>
            {isModalOpen && <EventoDetails eventId={Number(id)} onClose={handleCloseModal} />}
            {isSubEventModalOpen && <ModalCreateSubEvents isOpen={isSubEventModalOpen} onClose={handleCloseSubEventModal} eventId={Number(id)} onUpdateSubEvents={handleUpdateSubEvents} />}
            {isEditModalOpen && (
                <ModalEditSubEvent
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    subEventId={selectedSubEventId}
                    onUpdateSubEvents={handleUpdateSubEvents}
                />
            )}
        </>
    );
};

export default EventoDetailsPage;
