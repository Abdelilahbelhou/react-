import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_COMPTES } from "../graphql/queries";
import styled from "styled-components";

const AccountsList = ({ onSelectAccount }) => {
  const { loading, error, data } = useQuery(GET_ALL_COMPTES);

  if (loading) return <Message>Loading accounts...</Message>;
  if (error) return <Message>Error loading accounts: {error.message}</Message>;

  return (
    <AccountsContainer>
      {data.allComptes.map((compte) => (
        <AccountCard key={compte.id}>
          <AccountInfo>
            <Detail>
              <Label>Type:</Label> {compte.type}
            </Detail>
            <Detail>
              <Label>Balance:</Label> {compte.solde}
            </Detail>
            <Detail>
              <Label>Created On:</Label> {new Date(compte.dateCreation).toLocaleDateString()}
            </Detail>
          </AccountInfo>
          <ActionButton onClick={() => onSelectAccount(compte.id)}>View Details</ActionButton>
        </AccountCard>
      ))}
    </AccountsContainer>
  );
};

// Styled Components

const Message = styled.p`
  font-size: 18px;
  text-align: center;
  margin: 20px;
  color: #00796b;
  font-weight: 500;
`;

const AccountsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const AccountCard = styled.div`
  border: 1px solid #b2dfdb;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 250px;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }
`;

const AccountInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: 16px;
  color: #455a64;
`;

const Detail = styled.p`
  margin: 0;
`;

const Label = styled.span`
  font-weight: 600;
  color: #00796b;
`;

const ActionButton = styled.button`
  margin-top: 16px;
  padding: 12px 18px;
  background-color: #00796b;
  color: white;
  font-size: 14px;
  font-weight: 500;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #004d40;
    transform: translateY(-2px);
  }

  &:active {
    background-color: #00332d;
  }
`;

export default AccountsList;
