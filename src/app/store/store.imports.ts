import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducer } from './ngrx/todo.reducer';
import { TodoEffects } from './ngrx/todo.effects';

import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { TodoState } from './ngxs/todo.state';

import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';

import { environment } from 'src/environments/environment';

const devtools = [
  StoreDevtoolsModule.instrument({
    maxAge: 10,
  }),
];

export const storeImports = [
  // ngrx
  StoreModule.forRoot(
    { todo: reducer },
  ),
  EffectsModule.forRoot([TodoEffects]),
  ...(environment.production ? [] : devtools),

  // ngxs
  NgxsModule.forRoot(
    [TodoState],
    { developmentMode: !environment.production },
  ),
  NgxsReduxDevtoolsPluginModule.forRoot(),

  // akita
  // AkitaNgDevtools.forRoot(),
  // not working :(
];
