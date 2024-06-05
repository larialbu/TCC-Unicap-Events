import React, { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Input, Spinner, FormControl, FormLabel, useToast } from '@chakra-ui/react';
import axios from 'axios';

interface ModalCreateSubEventsProps {
    isOpen: boolean;
    onClose: () => void;
    eventId: number; // ID do evento principal
    onUpdateSubEvents: () => void; // Função para atualizar a lista de subeventos após a criação
}

const ModalCreateSubEvents: React.FC<ModalCreateSubEventsProps> = ({ isOpen, onClose, eventId, onUpdateSubEvents }) => {
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
    const [loading, setLoading] = useState(false);
    const toast = useToast(); 

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: name === 'quantity' ? parseInt(value) : value, 
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
            setLoading(true); 
            const token = localStorage.getItem('accessToken');
            if (!token) {
                return;
            }

            const formattedFormData = {
                ...formData,
                start_date: formatDateTime(formData.start_date), 
                end_date: formatDateTime(formData.end_date), 
                event_id: eventId,
                address: {
                    block: formData.block,
                    room: formData.room,
                },
                tickets: Array.from({ length: formData.quantity }, () => ({ status: 'available' })),
            };

            const response = await axios.post('https://unicap-events-backend.onrender.com/sub-event/', formattedFormData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('Subevento criado com sucesso:', response.data);
            resetForm(); 
            onUpdateSubEvents(); 
            toast({
                title: 'Subevento criado com sucesso!',
                description: "O subevento foi adicionado com sucesso.",
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'top-right',
            });
            onClose();
        } catch (error) {
            console.error('Ocorreu um erro ao criar o subevento:', error);
        } finally {
            setLoading(false); 
        }
    };

    const resetForm = () => {
        setFormData(initialFormData);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Adicionar Sub-Evento</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Input name="name" placeholder="Nome do sub-evento" value={formData.name} onChange={handleInputChange} marginTop="20px" />
                    <Input name="description" placeholder="Descrição do sub-evento" value={formData.description} onChange={handleInputChange} marginTop="20px" />
                    <FormControl marginTop="20px">
                        <FormLabel>Data e Hora Inicial</FormLabel>
                        <Input name="start_date" type="datetime-local" value={formData.start_date} onChange={handleInputChange} />
                    </FormControl>
                    <FormControl marginTop="20px">
                        <FormLabel>Data e Hora Final</FormLabel>
                        <Input name="end_date" type="datetime-local" value={formData.end_date} onChange={handleInputChange} />
                    </FormControl>
                    <Input name="block" placeholder="Bloco" value={formData.block} onChange={handleInputChange} marginTop="20px" />
                    <Input name="room" placeholder="Sala" value={formData.room} onChange={handleInputChange} marginTop="20px" />
                    <FormControl marginTop="20px">
                        <FormLabel>Quantidade de Ingressos</FormLabel>
                        <Input name="quantity" type="number" placeholder="Quantidade de Ingressos" value={formData.quantity} onChange={handleInputChange} />
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="red" mr={3} onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button colorScheme="green" onClick={handleSubmit} isLoading={loading}>
                        {loading ? <Spinner size="sm" color="yellow" /> : "Adicionar"}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ModalCreateSubEvents;
