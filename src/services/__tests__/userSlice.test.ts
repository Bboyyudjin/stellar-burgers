import { TUser } from "@utils-types";
import { userSlice, initialState, registerUser, loginUser, logoutUser, updateUser, checkUserAuth, setAuthChecked, clearError, selectUser, selectIsAuthChecked, selectIsAuthenticated, selectUserLoading, selectUserError} from "../slices/userSlice";

describe('userSlice', () => {
  const mockUser: TUser = {
    email: 'BboyYudjin1@yandex.ru',
    name: 'BboyYudjin1'
  };

  it('тест initialState', () => {
    expect(userSlice.reducer(undefined, {type: 'unknown'})).toEqual(initialState)
  })

  describe('тест reducers', () => {
    it('тест setAuthChecked', () => {
      const action = setAuthChecked(true);
      const state = userSlice.reducer(initialState, action);
      expect(state.isAuthChecked).toBe(true);
    });

    it('тест clearError', () => {
      const stateWithError = { ...initialState, error: 'Ошибка аутентификации' };
      const action = clearError();
      const state = userSlice.reducer(stateWithError, action);
      expect(state.error).toBeUndefined();
    });
  })

  describe('тест extraReducers', () => {
    describe('registerUser', () => {
      it('тест registerUser.pending', () => {
        const action = { type: registerUser.pending.type };      
        const state = userSlice.reducer(initialState, action);
        expect(state).toEqual({
          ...initialState,
          loading: true,
          error: undefined
        });
      })
    
      it('тест registerUser.fullfilled', () => {
        const action = { 
          type: registerUser.fulfilled.type,
          payload: { user: mockUser }
        };      
        const state = userSlice.reducer(initialState, action);
        expect(state).toEqual({
          ...initialState,
          user: mockUser,
          loading: false,
          isAuthChecked: true,
          isAuthenticated: true
        });
      })
  
      it('тест registerUser.rejected', () => {
        const errorMessage = 'Ошибка регистрации'
        const action = { 
          type: registerUser.rejected.type,
          error: {message: errorMessage}
        };       
        const state = userSlice.reducer(initialState, action);
        expect(state).toEqual({
          ...initialState,
          loading: false,
          error: errorMessage,
          isAuthenticated: false
        });
      })
    })

    describe('loginUser', () => {
      it('тест loginUser.pending', () => {
        const action = { type: loginUser.pending.type };      
        const state = userSlice.reducer(initialState, action);
        expect(state).toEqual({
          ...initialState,
          loading: true,
          error: undefined
        });
      })
    
      it('тест loginUser.fullfilled', () => {
        const action = { 
          type: loginUser.fulfilled.type,
          payload: { user: mockUser }
        };      
        const state = userSlice.reducer(initialState, action);
        expect(state).toEqual({
          ...initialState,
          user: mockUser,
          loading: false,
          isAuthChecked: true,
          isAuthenticated: true
        });
      })
  
      it('тест registerUser.rejected', () => {
        const errorMessage = 'Ошибка входа'
        const action = { 
          type: registerUser.rejected.type,
          error: {message: errorMessage}
        };       
        const state = userSlice.reducer(initialState, action);
        expect(state).toEqual({
          ...initialState,
          loading: false,
          error: errorMessage,
          isAuthenticated: false
        });
      })
    })

    describe('logoutUser', () => {
      const loggedInState = {
          ...initialState,
          user: mockUser,
          isAuthenticated: true
        };

      it('тест logoutUser.pending', () => {
        const action = { type: logoutUser.pending.type };      
        const state = userSlice.reducer(loggedInState, action);
        expect(state).toEqual({
          ...loggedInState,
          loading: true,
          error: undefined
        });
      })
    
      it('тест logoutUser.fullfilled', () => {
        const action = { type: logoutUser.fulfilled.type };      
        const state = userSlice.reducer(loggedInState, action);
        expect(state).toEqual({
          ...initialState,
          user: null,
          loading: false,
          isAuthenticated: false
        });
      })
  
      it('тест logoutUser.rejected', () => {
        const errorMessage = 'Ошибка выхода'
        const action = { 
          type: logoutUser.rejected.type,
          error: {message: errorMessage}
        };       
        const state = userSlice.reducer(initialState, action);
        expect(state).toEqual({
          ...loggedInState,
          loading: false,
          error: errorMessage,
          user: null,
          isAuthenticated: false
        });
      })
    })

    describe('updateUser', () => {
      it('тест updateUser.pending', () => {
        const action = { type: updateUser.pending.type };      
        const state = userSlice.reducer(initialState, action);
        expect(state).toEqual({
          ...initialState,
          loading: true,
          error: undefined
        });
      })
    
      it('тест updateUser.fullfilled', () => {
        const updatedUser: TUser = {
          ...mockUser, name: 'newName'
        }

        const action = { 
          type: updateUser.fulfilled.type,
          payload: updatedUser
        };      

        const state = userSlice.reducer(initialState, action);
        expect(state).toEqual({
          ...initialState,
          user: updatedUser,
          loading: false,
        });
      })
  
      it('тест updateUser.rejected', () => {
        const errorMessage = 'Ошибка обновления'
        const action = { 
          type: registerUser.rejected.type,
          error: {message: errorMessage}
        };       
        const state = userSlice.reducer(initialState, action);
        expect(state).toEqual({
          ...initialState,
          loading: false,
          error: errorMessage,
        });
      })
    })

    describe('checkUserAuth', () => {
      it('тест checkUserAuth.pending', () => {
        const action = { type: checkUserAuth.pending.type };
        const state = userSlice.reducer(initialState, action);
    
        expect(state).toEqual({
          ...initialState,
          loading: true,
          error: undefined
        });
      });

      it('тест checkUserAuth.fulfilled (успешная аутентификация)', () => {
        const action = { 
          type: checkUserAuth.fulfilled.type,
          payload: mockUser
        };
        const state = userSlice.reducer(initialState, action);
    
        expect(state).toEqual({
          ...initialState,
          loading: false,
          user: mockUser,
          isAuthenticated: true
        });
      });

      it('тест checkUserAuth.fulfilled (неудачная аутентификация)', () => {
        const action = { 
          type: checkUserAuth.fulfilled.type,
          payload: null
        };
        const state = userSlice.reducer(initialState, action);
    
        expect(state).toEqual({
          ...initialState,
          loading: false,
          user: null,
          isAuthenticated: false
        });
      });

      it('тест checkUserAuth.rejected', () => {
        const errorMsg = 'Ошибка проверки аутентификации';
        const action = {
          type: checkUserAuth.rejected.type,
          error: { message: errorMsg }
        };
        const state = userSlice.reducer(initialState, action);
    
        expect(state).toEqual({
          ...initialState,
          loading: false,
          isAuthenticated: false
        });
      });
    })
  })

  describe('тест Selectors', () => {
      const state = {
        user: {
          user: mockUser,
          loading: false,
          error: undefined,
          isAuthChecked: false,
          isAuthenticated: false
        }
      };
  
      it('селектор User', () => {
        expect(selectUser(state)).toEqual(mockUser);
      });
  
      it('селектор IsAuthChecked', () => {
        expect(selectIsAuthChecked(state)).toBe(false);
      });
  
      it('селектор IsAuthenticated', () => {
        expect(selectIsAuthenticated(state)).toBe(false);
      });
  
      it('селектор UserLoading', () => {
        expect(selectUserLoading(state)).toBe(false);
      });
  
      it('селктор UserError', () => {
        expect(selectUserError(state)).toBeUndefined();
      });
    });
})
