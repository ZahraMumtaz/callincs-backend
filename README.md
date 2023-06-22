## Backend Installation

---

```bash
$ npm install
```

## Steps to run the app

1. Complete the installations by running the above mentioned commands
2. Add configuration variable through `cp .env.example .env` bash command.
3. Run the app by running any of the following command based on the environment.

   ```bash
   # development
   $ npm run start

   # watch mode
   $ npm run start:dev

   ```

4. Run `seedData` mutation to seed dummy data into the database in apollo sandbox
5. Redirect to `http://localhost:3000/graphql` to run the query and mutation on apollo sandbox.

### Following are the list mutations and queries.

---

- ## To seed data in database

  ```
   mutation seedData{
        seedData
    }

  ```

- ## Login User

  ```
  mutation
  loginUser($email: String!, $password: String!) {
  loginUser(email:$email, password:$password){
      user {
      id,
      email
      },
      access_token
      }
    }
  }
  ```

  #### Variables

  ```
  {
  "email": "user1@example.com",
  "password": "123456789"
  }

  ```

- ### ME (To get user detail through JWT token)

  ```
  query Me {
      me {
      id,
      email,
      password
    }
  }
  ```

- ## Refresh Token

  ```
    mutation RefreshToken {
    refreshToken {
    user {
      email
      id
    }
    access_token
   }
  }
  ```

- ### Call Lists

       query CallList($offset: Int, $limit: Int, $query: SearchCallList){
          calls(offset: $offset, limit: $limit, query: $query) {
          nodes {
          id,
          direction,
          from,
          to,
          duration,
          is_archived,
          call_type,
          via,
          created_at
          notes {
          content
          id
        }
       }
       hasNextPage
       totalCount
        }
       }

  #### Variables

  ```
   {
    "offset": 0,
    "limit": 10,
    "query": {
    "startDate":"2023-06-21 00:00:00",
    "endDate":"2023-06-21 23:59:59"
    }
   }

  ```

- ### Get Call By Id

  ```
  query Call($callId: ID!) {
    call(id: $callId) {
    id,
    direction
    from
    to
    duration
    call_type
    is_archived
    notes {
      content
      id
    }
    via
    created_at
    }
  }
  ```

  #### Variables

  ```
  {
   "callId": "< call ObjectId from calls collection >"
  }
  ```

- ### Create a Note against call Id

  ```
   mutation CreateNote($callId: ID!, $content: String!) {
     createNote(callId: $callId, content: $content) {
       id
       is_archived
       from
       duration
       to
       call_type
       direction
       via
       notes {
       content
       id
      }
      created_at
    }
  }
  ```

  #### Variables

  ```
  {
   "callId": "< call ObjectId from calls collection >",
   "content": "This is a test note"
  }
  ```

- ### Toggle Archive Call Status

  ```
  mutation ToggleArchiveCall($toggleArchiveCallId: ID!) {
    toggleArchiveCall(id: $toggleArchiveCallId) {
      id
      call_type
      direction
      duration
      from
      is_archived
      notes {
        content
        id
      }
      to
      via
      created_at
    }
  }
  ```

- ### On Update Call (Subscription)

  ```
   subscription OnUpdateCall($onUpdateCallId: ID!) {
     onUpdateCall(id: $onUpdateCallId) {
      id
      is_archived
      notes {
       content
       id
      }
      duration
      direction
      from
      to
      via
      created_at
      call_type
    }
   }
  ```

  #### Variables

  ```
   {
     "onUpdateCallId": "649285fa3465d6e57f856f87"
  }
  ```

  ### Note: Kindly add JWT token receive in the response of loginUser mutation in headers `Authorization Bearer <Token>` of all mutations and queries except loginUser and seedData.
