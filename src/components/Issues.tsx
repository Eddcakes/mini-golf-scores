import { List, ListItem, Text } from "@chakra-ui/react";
import { ZodIssueCode } from "zod";

export interface CustomError {
  type: "unknown" | "json" | "zod";
  issues: ZodIssue[] | string;
}

interface ZodIssue {
  code: ZodIssueCode;
  path: (string | number)[];
  message: string;
}

export function Issues({ issues }: CustomError) {
  if (typeof issues === "string") {
    return <Text color="red.500">{issues}</Text>;
  }
  return (
    <List color="red.500">
      {issues.map((issue) => {
        const id = issue.path[1];
        // naive implementation as we only need to check two levels deep for this data
        if (issue.path.length === 3) {
          // top level
          return (
            <ListItem
              key={issue.path.join("-")}
            >{`${id}: ${issue.message} for the field ${issue.path[2]}`}</ListItem>
          );
        }
        return (
          <ListItem
            key={issue.path.join("-")}
          >{`${id}: ${issue.message} for the field ${issue.path[2]} - ${issue.path[4]}`}</ListItem>
        );
      })}
    </List>
  );
}
