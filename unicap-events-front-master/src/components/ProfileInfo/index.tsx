import React from 'react';
import styled from 'styled-components';

const GridContainer = styled.div`
  display: grid;
  gap: 20px; // Espaçamento entre os itens
`;

const GridItem = styled.div`
  // Estilo para cada item no grid
  display: flex;
  align-items: center;
  padding: 20px; // Adiciona um espaçamento interno ao card
  border: 2px solid #6A0014; // Adiciona uma borda ao card
  border-radius: 10px; // Adiciona bordas arredondadas ao card
  transition: transform 0.3s ease; // Adiciona uma transição suave ao efeito de transformação

  &:hover {
    transform: scale(1.05); // Aumenta ligeiramente o tamanho do card ao passar o mouse sobre ele
  }

  // Estilo para o texto
  p {
    font-size: 18px;
  }

  // Estilo para os links
  a {
    text-decoration: none;
    color: #6A0014;
    font-weight: bold;
    margin-right: 10px; // Adiciona um espaçamento entre os links
  }
`;

const ProfileImage = styled.img`
  width: 150px; // Ajusta a largura da imagem
  height: auto; // Mantém a proporção da imagem
  max-width: 100%; // Garante que a imagem não ultrapasse o contêiner
  margin-right: 20px;
  border-radius: 20px;

  @media (max-width: 767px) {
    width: 100px;
    margin-right: 0; // Remove a margem à direita em resoluções menores que 768px
    margin-right: 20px;
  }
`;

interface ProfileInfoProps {
  imageUrl: string;
  name: string;
  role: string;
  githubLink: string;
  linkedinLink: string;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ imageUrl, name, role, githubLink, linkedinLink }) => {
  return (
    <GridContainer>
      <GridItem>
        <ProfileImage src={imageUrl} alt="Imagem do criador" />
        <div>
          <p><strong>{name}</strong></p>
          <p>{role}</p>
          <a href={githubLink} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={linkedinLink} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </GridItem>
    </GridContainer>
  );
};

export default ProfileInfo;