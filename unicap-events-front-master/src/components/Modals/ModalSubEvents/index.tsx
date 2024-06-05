import React, { useState, useEffect } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Input, Spinner, FormControl, FormLabel, useToast } from '@chakra-ui/react';
import axios from 'axios';

interface ModalEditSubEventProps {
    isOpen: boolean;
    onClose: () => void;
    subEventId: number | null;
    onUpdateSubEvents: () => void; // Função para atualizar a lista de subeventos após a edição
}

const ModalEditSubEvent: React.FC<ModalEditSubEventProps> = ({ isOpen, onClose, subEventId, onUpdateSubEvents }) => {
    const initialFormData = {
        name: '',
        description: '',
        start_date: '',
        end_date: '',
        block: '',
        room: '',
        quantity: 0,
    };

    const [formData, setFormData] = useState(initialFormData);
    const [loading, setLoading] = useState(false); // Estado para controlar o carregamento do botão
    const toast = useToast();

    useEffect(() => {
        const fetchSubEvent = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('accessToken');
                if (!token) {
                    // Lógica para lidar com a falta de token
                    return;
                }
                const response = await axios.get(`https://unicap-events-backend.onrender.com/sub-event/${subEventId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const subEventData = response.data.data;
                setFormData({
                    name: subEventData.name,
                    description: subEventData.description,
                    start_date: subEventData.start_date,
                    end_date: subEventData.end_date,
                    block: subEventData.address.block,
                    room: subEventData.address.room,
                    quantity: subEventData.tickets.length,
                });
            } catch (error) {
                console.error('Ocorreu um erro ao buscar os detalhes do subevento:', error);
            } finally {
                setLoading(false);
            }
        };

        if (isOpen) {
            fetchSubEvent();
        }
    }, [isOpen, subEventId]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const formatDateTime = (dateTimeString: string) => {
        const date = new Date(dateTimeString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:00`;
    };

    const handleSubmit = async () => {
        try {
            setLoading(true); // Define o estado de loading como true
            const token = localStorage.getItem('accessToken');
            if (!token) {
                // Lógica para lidar com a falta de token
                return;
            }

            // Formatar as datas para o formato esperado pela API (YYYY-MM-DD HH:MM:SS)
            const formattedFormData = {
                ...formData,
                start_date: formatDateTime(formData.start_date), // Formata a data de início
                end_date: formatDateTime(formData.end_date), // Formata a data de término
                address: {
                    block: formData.block,
                    room: formData.room,
                },
            };

            const response = await axios.put(`https://unicap-events-backend.onrender.com/sub-event/${subEventId}`, formattedFormData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('Subevento editado com sucesso:', response.data);
            onUpdateSubEvents(); // Atualiza a lista de subeventos após a edição do subevento
            onClose(); // Fecha o modal após a edição do subevento
            toast({
                title: "Subevento editado com sucesso!",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        } catch (error) {
            console.error('Ocorreu um erro ao editar o subevento:', error);
            // Lógica para lidar com o erro de edição do subevento
            toast({
                title: "Erro ao editar subevento!",
                description: "Ocorreu um erro ao editar o subevento. Por favor, tente novamente mais tarde.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setLoading(false); // Define o estado de loading como false após a edição do subevento (seja sucesso ou erro)
        }
    };

    const handleDelete = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('accessToken');
            if (!token) {
                // Lógica para lidar com a falta de token
                return;
            }

            await axios.delete(`https://unicap-events-backend.onrender.com/sub-event/${subEventId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast({
                title: 'Subevento excluído com sucesso!',
                description: "O subevento foi removido do sistema.",
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            onUpdateSubEvents(); // Atualiza a lista de subeventos após a exclusão
            onClose();
        } catch (error) {
            console.error('Ocorreu um erro ao excluir o subevento:', error);
            toast({
                title: 'Erro ao excluir subevento!',
                description: 'Ocorreu um erro ao excluir o subevento. Por favor, tente novamente mais tarde.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Editar Sub-Evento</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl marginTop="20px">
                        <FormLabel>Nome do sub-evento</FormLabel>
                        <Input name="name" placeholder="Nome do sub-evento" value={formData.name} onChange={handleInputChange} />
                    </FormControl>
                    <FormControl marginTop="20px">
                        <FormLabel>Descrição do sub-evento</FormLabel>
                        <Input name="description" placeholder="Descrição do sub-evento" value={formData.description} onChange={handleInputChange} />
                    </FormControl>
                    <FormControl marginTop="20px">
                        <FormLabel>Data e Hora Inicial</FormLabel>
                        <Input name="start_date" type="datetime-local" value={formData.start_date} onChange={handleInputChange} />
                    </FormControl>
                    <FormControl marginTop="20px">
                        <FormLabel>Data e Hora Final</FormLabel>
                        <Input name="end_date" type="datetime-local" value={formData.end_date} onChange={handleInputChange} />
                    </FormControl>
                    <FormControl marginTop="20px">
                        <FormLabel>Bloco</FormLabel>
                        <Input name="block" placeholder="Bloco" value={formData.block} onChange={handleInputChange} />
                    </FormControl>
                    <FormControl marginTop="20px">
                        <FormLabel>Sala</FormLabel>
                        <Input name="room" placeholder="Sala" value={formData.room} onChange={handleInputChange} />
                    </FormControl>
                    <FormControl marginTop="20px">
                        <FormLabel>Quantidade de Ingressos</FormLabel>
                        <Input name="quantity" type="number" placeholder="Quantidade de Ingressos" value={formData.quantity} onChange={handleInputChange} />
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='yellow' mr={3} onClick={onClose}>
                        Fechar
                    </Button>
                    <Button colorScheme="red" mr={3} onClick={handleDelete} isLoading={loading}>
                        {loading ? <Spinner size="sm" color="yellow" /> : "Excluir"}
                    </Button>
                    <Button colorScheme="green" onClick={handleSubmit} isLoading={loading}>
                        {loading ? <Spinner size="sm" color="yellow" /> : "Salvar"}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ModalEditSubEvent;
