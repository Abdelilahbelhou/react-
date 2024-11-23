import React from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import styled from "styled-components";

const GET_TRANSACTIONS = gql`
  query GetCompteTransactions($id: ID!) {
    compteTransactions(id: $id) {
      id
      montant
      date
      type
    }
  }
`;

const TransactionList = ({ compteId }) => {
  const { data, loading, error, refetch } = useQuery(GET_TRANSACTIONS, {
    variables: { id: compteId },
  });

  if (loading) return <Message>Loading transactions...</Message>;

  if (error)
    return (
      <ErrorContainer>
        <ErrorMessage>Error: {error.message}</ErrorMessage>
        <RetryButton onClick={() => refetch()}>Retry</RetryButton>
      </ErrorContainer>
    );

  if (!data.compteTransactions || data.compteTransactions.length === 0) {
    return <Message>No transactions found for this account.</Message>;
  }

  return (
    <TransactionContainer>
      <Title>Transactions</Title>
      <TransactionListContainer>
        {data.compteTransactions.map((transaction) => (
          <TransactionItem key={transaction.id}>
            <TransactionDetail>
              <strong>Type:</strong> {transaction.type}
            </TransactionDetail>
            <TransactionDetail>
              <strong>Montant:</strong> {transaction.montant.toFixed(2)}
            </TransactionDetail>
            <TransactionDetail>
              <strong>Date:</strong> {new Date(transaction.date).toLocaleDateString()}
            </TransactionDetail>
          </TransactionItem>
        ))}
      </TransactionListContainer>
    </TransactionContainer>
  );
};

// Styled Components

const TransactionContainer = styled.div`
  margin: 20px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h3`
  margin-bottom: 20px;
  color: #333;
  text-align: center;
  font-size: 24px;
`;

const TransactionListContainer = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const TransactionItem = styled.li`
  background-color: #ffffff;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }
`;

const TransactionDetail = styled.p`
  margin: 5px 0;
  font-size: 16px;
  color: #444;
`;

const ErrorContainer = styled.div`
  padding: 20px;
  background-color: #ffe5e5;
  border-radius: 8px;
  text-align: center;
  color: #d9534f;
  margin: 20px;
`;

const ErrorMessage = styled.p`
  margin-bottom: 15px;
  font-size: 16px;
`;

const RetryButton = styled.button`
  padding: 10px 20px;
  background-color: #d9534f;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c9302c;
  }

  &:focus {
    outline: none;
  }
`;

const Message = styled.p`
  text-align: center;
  font-size: 16px;
  color: #666;
`;

export default TransactionList;
