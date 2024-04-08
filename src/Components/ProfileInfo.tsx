import { Button } from '@mantine/core';
import React, { useState } from 'react';
import styled from 'styled-components';

const TableRow = styled.div<{ selected: boolean }>`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: ${(props) => (props.selected ? '#CCCCCC' : 'transparent')};
`;

const TableCell = styled.div<{ flex?: number }>`
  flex: ${(props) => props.flex || 1};
  padding: 10px;
  color: white;
`;

const CheckboxInput = styled.input`
  margin: 0;
`;

const Text = styled.span<{ size?: string; fw?: number }>`
  font-size: ${(props) => props.size || 'inherit'};
  font-weight: ${(props) => props.fw || 'inherit'};
`;

// Interface for item
interface Item {
  id: number;
  name: string;
  email: string;
  job: string;
}

const items: Item[] = [
  {
    id: 1,
    name: 'Müzik İsmi',
    email: 'Müzisyen',
    job: 'Müzik Türü',
  },
  {
    id: 2,
    name: 'Diamonds',
    email: 'Rihanna',
    job: 'Pop',
  },
  {
    id: 3,
    name: 'Diamonds1',
    email: 'Rihanna',
    job: 'Pop',
  },
  {
    id: 4,
    name: 'Diamonds2',
    email: 'Rihanna',
    job: 'Pop',
  },
];

export const MyTable: React.FC = () => {
  const [rows, setRows] = useState<Item[]>(items);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const toggleRow = (id: number) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const deleteSelectedRows = () => {
    const filteredRows = rows.filter((row) => !selectedRows.includes(row.id));
    setRows(filteredRows);
    setSelectedRows([]);
  };

  return (
    <>
      {rows.map((item) => (
        <TableRow key={item.id} selected={selectedRows.includes(item.id)}>
          <TableCell flex={0.1}> {/* Adjusted flex value */}
            {item.id !== 1 && ( // Render checkbox for rows other than the first one
              <CheckboxInput
                type="checkbox"
                checked={selectedRows.includes(item.id)}
                onChange={() => toggleRow(item.id)}
              />
            )}
          </TableCell>
          <TableCell flex={2}> {/* Adjusted flex value */}
            <div style={{ display: 'flex', alignItems: 'center'}}>
              <Text size="small" fw={500}>
                {item.name}
              </Text>
            </div>
          </TableCell>
          <TableCell flex={2}> {/* Adjusted flex value */}
            {item.email}
          </TableCell>
          <TableCell flex={2}> {/* Adjusted flex value */}
            {item.job}
          </TableCell>
        </TableRow>
      ))}
      <Button onClick={deleteSelectedRows} style={{marginLeft:'20px'}}>Seçili bilgileri profilimden sil</Button>
    </>
  );
};

const headerBlue = '#1F2D5A';

export default function ProfileInfo() {
  return (
    <div style={{ justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: headerBlue }}>
      <MyTable />
    </div>
  );
}
