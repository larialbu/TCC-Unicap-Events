import React from 'react';
import styled from 'styled-components';
import { mockDataList, ProfileData } from '../../const/mock-perfils'; // Importa a lista de dados fictícios e o tipo de dados
import ProfileInfo from '../ProfileInfo';

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr); // Define duas colunas de tamanho igual
    gap: 20px; // Espaçamento entre os itens

    @media (max-width: 768px) {
        grid-template-columns: repeat(1, 1fr); // Define duas colunas de tamanho igual em resoluções maiores que 768px
    }
`;

const GridItem = styled.div`
  // Estilo para cada item no grid
`;

const MockProfile: React.FC = () => {
    return (
        <GridContainer>
        {mockDataList.map((profile: ProfileData, index: number) => (
            <GridItem key={index}>
            <ProfileInfo
                imageUrl={profile.imageUrl}
                name={profile.name}
                role={profile.role}
                githubLink={profile.githubLink}
                linkedinLink={profile.linkedinLink}
            />
            </GridItem>
        ))}
        </GridContainer>
    );
};

export default MockProfile;