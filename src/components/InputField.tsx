import React from "react";
import { Input, Button } from "@chakra-ui/react";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

const InputField: React.FC<Props> = ({ todo, setTodo, handleAdd }) => {
  return (
    <form onSubmit={handleAdd}>
      <Input
        placeholder="Task"
        w="89%"
        value={todo}
        onChange={(e) => {
          setTodo(e.target.value);
        }}
      />
      <Button colorScheme="telegram" variant="solid" ml={3} type="submit">
        Button
      </Button>
    </form>
  );
};

export default InputField;
