import React, { ReactNode } from "react";
import TodoShow from "./TodoShow";
import { SimpleGrid, Box, Card, CardBody, Text } from "@chakra-ui/react";
import { Todo } from "../interfaces/model";
import { Droppable } from "react-beautiful-dnd";
import TodoCompletedShow from "./TodoCompletedShow";

interface Props {
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({
  todos,
  setTodos,
  setTodo,
  completedTodos,
  setCompletedTodos,
}) => {
  return (
    <div>
      <SimpleGrid columns={2} spacing={5} mt={10}>
        <Droppable droppableId="todoslist">
          {(provided) => (
            <Card
              variant="outline"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <CardBody>
                <Text textAlign="center" mb={5}>
                  Active tasks
                </Text>
                <Box>
                  {todos.map((todo, index) => {
                    return (
                      <TodoShow
                        index={index}
                        todo={todo}
                        setTodos={setTodos}
                        todos={todos}
                        setTodo={setTodo}
                        key={todo.id}
                      />
                    );
                  })}
                </Box>
              </CardBody>
              {provided.placeholder}
            </Card>
          )}
        </Droppable>
        <Droppable droppableId="todosremove">
          {(provided) => (
            <Card
              variant="outline"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <CardBody>
                <Text textAlign="center" mb={5}>
                  Completed tasks
                </Text>
                <Box>
                  {completedTodos.map((todo, index) => {
                    return (
                      <TodoCompletedShow
                        index={index}
                        todo={todo}
                        setCompletedTodos={setCompletedTodos}
                        completedTodos={completedTodos}
                        key={todo.id}
                      />
                    );
                  })}
                </Box>
              </CardBody>
              {provided.placeholder}
            </Card>
          )}
        </Droppable>
      </SimpleGrid>
    </div>
  );
};

export default TodoList;
