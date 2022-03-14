/* eslint-disable react-hooks/exhaustive-deps */
import React, { ChangeEvent } from "react";
import { Search } from "@mui/icons-material";
import { Box, IconButton, InputBase, Paper, styled } from "@mui/material";
import { useNavigate } from "react-router";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { FormEvent } from "react";

export const SearchBox: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [name, setName] = useState<string>(searchParams.get("name") || "");

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    navigate({
      pathname: "search",
      search: createSearchParams({ name }).toString(),
    });
  }

  return (
    <StyledBox data-testid="search-box">
      <StyledPaper component="form" onSubmit={submitForm}>
        <StyledInput
          name="name"
          placeholder="Search a movie"
          value={name}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setName(event.target.value)
          }
        />
        <StyledIconButton type="submit" aria-label="search">
          <Search />
        </StyledIconButton>
      </StyledPaper>
    </StyledBox>
  );
};

const StyledPaper = styled(Paper)`
  width: 400px;
  padding: 2px 4px;
  display: flex;
  align-items: center;
`;

const StyledBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledInput = styled(InputBase)`
  margin-left: 10px;
  flex: 1;
`;

const StyledIconButton = styled(IconButton)`
  padding: 10px;
`;
