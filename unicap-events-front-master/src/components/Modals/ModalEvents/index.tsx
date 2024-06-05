import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Spinner, Flex, Input, useToast } from '@chakra-ui/react';
import { format } from 'date-fns';

const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:00`;
};

interface Evento {
    data: {
        id: number;
        name: string;
        start_date: string;
        end_date: string;
        description: string; // Corrigido para string
    }
}

interface EventoDetailsProps {
    eventId: number | null;
    onClose: () => void;
}

const EventoDetails: React.FC<EventoDetailsProps> = ({ eventId, onClose }) => {
    const [evento, setEvento] = useState<Evento | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const toast = useToast();

    useEffect(() => {
        const fetchEvento = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                if (!token) {
                    return;
                }

                setLoading(true);
                const response = await axios.get(`https://unicap-events-backend.onrender.com/event/${eventId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const eventData = response.data.data; // Extrair os dados do evento da resposta
                const formattedEvento = { ...response.data, data: { ...eventData, start_date: formatDateTime(eventData.start_date), end_date: formatDateTime(eventData.end_date) } };
                setEvento(formattedEvento);
                setLoading(false);
            } catch (error) {
                console.error('Ocorreu um erro ao buscar detalhes do evento:', error);
                setLoading(false);
            }
        };

        if (eventId) {
            fetchEvento();
        }
    }, [eventId]);

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token || !evento) {
                return;
            }

            setLoading(true);
            await axios.put(`https://unicap-events-backend.onrender.com/event/${evento.data.id}`, evento.data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setLoading(false);

            onClose();
            toast({
                title: "Evento salvo com sucesso!",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        } catch (error) {
            console.error('Ocorreu um erro ao salvar as alterações do evento:', error);
            setLoading(false);
            toast({
                title: "Erro ao salvar evento!",
                description: "Ocorreu um erro ao salvar as alterações do evento. Por favor, tente novamente mais tarde.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token || !evento) {
                return;
            }

            setLoading(true);
            await axios.delete(`https://unicap-events-backend.onrender.com/event/${evento.data.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setLoading(false);

            onClose();
            toast({
                title: "Evento excluído com sucesso!",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        } catch (error) {
            console.error('Ocorreu um erro ao excluir o evento:', error);
            setLoading(false);
            toast({
                title: "Erro ao excluir evento!",
                description: "Ocorreu um erro ao excluir o evento. Por favor, tente novamente mais tarde.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEvento((prevState: any) => ({
            ...prevState,
            data: {
                ...prevState.data,
                [name]: value,
            }
        }));
    };

    return (
        <Modal isOpen={!!eventId} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Detalhes do Evento</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {loading ? (
                        <Flex justify="center" align="center" height="60px">
                            <Spinner size="xl" color="red.500" />
                        </Flex>
                    ) : (
                        evento ? (
                            <div>
                                <p><strong>Nome:</strong> <Input name="name" value={evento.data.name} onChange={handleChange} marginTop="20px" /></p>
                                <p><strong>Data e Hora Inicial:</strong> <Input name="start_date" value={formatDateTime(evento.data.start_date)} onChange={handleChange} marginTop="20px" /></p>
                                <p><strong>Data e Hora Final:</strong> <Input name="end_date" value={formatDateTime(evento.data.end_date)} onChange={handleChange} marginTop="20px" /></p>
                                <p><strong>Descrição:</strong> <Input name="description" value={evento.data.description} onChange={handleChange} marginTop="20px" /></p>
                            </div>
                        ) : (
                            <p>Erro ao carregar</p>
                        )
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='yellow' mr={3} onClick={onClose}>
                        Fechar
                    </Button>
                    <Button colorScheme='red' mr={3} onClick={handleDelete}>
                        Excluir
                    </Button>
                    <Button colorScheme='green' mr={3} onClick={handleSave}>
                        Salvar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default EventoDetails;
