import React, { useState } from "react";
import { Flex, Box, VStack, useColorMode, Container } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { FaSun, FaMoon } from "react-icons/fa";
import InputField from "./components/InputField";
import { Todo } from "./interfaces/model";
import TodoList from "./components/TodoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const App: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTodos([...todos, { id: Date.now(), task: todo, isDone: false }]);
      setTodo("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    let add,
      active = todos,
      complete = completedTodos;

    if (source.droppableId === "todoslist") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    if (destination.droppableId === "todoslist") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodos(complete);
    setTodos(active);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <VStack>
        <Container maxW="container.lg">
          <Flex justifyContent="center" mt={20} mb={10}>
            <Box fontSize={40} fontWeight="bold">
              Taskify
            </Box>
          </Flex>
          <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
          <IconButton
            onClick={toggleColorMode}
            icon={isDark ? <FaSun /> : <FaMoon />}
            isRound={true}
            position="fixed"
            aria-label="sun"
            right={40}
            top={5}
          ></IconButton>
          <TodoList
            todos={todos}
            setTodos={setTodos}
            setTodo={setTodo}
            completedTodos={completedTodos}
            setCompletedTodos={setCompletedTodos}
          />
        </Container>
      </VStack>
    </DragDropContext>
  );
};

export default App;
