import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Spinner, useToast } from '@chakra-ui/react';
import { format } from 'date-fns';
import axios from 'axios';

interface ModalPickTicketProps {
    isOpen: boolean;
    onClose: () => void;
    subEvent: {
        id: number;
        name: string;
        description: string;
        start_date: string;
        end_date: string;
        address: {
            block: string;
            room: string;
        };
    };
}

const ModalPickTicket: React.FC<ModalPickTicketProps> = ({ isOpen, onClose, subEvent }) => {
    const [loading, setLoading] = React.useState<boolean>(false);
    const toast = useToast(); // Usado para exibir o alerta

    const handleSubscribe = async () => {
        console.log('handleSubscribe called'); // Log para depuração
        try {
            setLoading(true);
            const token = localStorage.getItem('accessToken');


            if (!token) {
                console.error('Token não encontrado.');
                return;
            }

            const response = await axios.put(`https://unicap-events-backend.onrender.com/user/subscribe/${subEvent.id}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log('Resposta do backend:', response.data);

            if (response.data.error === "Usuário já inscrito no evento") {
                toast({
                    title: 'Usuário já está inscrito!',
                    description: 'Você já está inscrito neste subevento.',
                    status: 'warning',
                    duration: 5000,
                    isClosable: true,
                    position: 'top-right',
                });
            } else {
                toast({
                    title: 'Inscrição realizada com sucesso!',
                    description: 'Você foi inscrito no subevento.',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                    position: 'top-right',
                });
            }

            onClose(); // Fechar o modal em qualquer caso de resposta
        } catch (error) {
            console.error('Ocorreu um erro ao se inscrever no subevento:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{subEvent.name}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <p><strong>Descrição:</strong> {subEvent.description}</p>
                    <p><strong>Data e Hora Inicial:</strong> {format(new Date(subEvent.start_date), 'dd/MM/yyyy HH:mm')}</p>
                    <p><strong>Data e Hora Final:</strong> {format(new Date(subEvent.end_date), 'dd/MM/yyyy HH:mm')}</p>
                    <p><strong>Localização:</strong> Bloco {subEvent.address.block}, Sala {subEvent.address.room}</p>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="yellow" onClick={onClose}>
                        Fechar
                    </Button>
                    <Button colorScheme="green" onClick={handleSubscribe} isLoading={loading} ml={3}>
                        {loading ? <Spinner size="sm" color="yellow" /> : "Se Inscrever"}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ModalPickTicket;