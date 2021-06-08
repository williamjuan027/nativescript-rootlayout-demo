import { platformNativeScriptDynamic, platformNativeScript, runNativeScriptAngularApp } from '@nativescript/angular';

import { AppModule } from './app/app.module';

// platformNativeScriptDynamic().bootstrapModule(AppModule);

// platformNativeScript().bootstrapModule(AppModule);

runNativeScriptAngularApp({
	appModuleBootstrap: () => platformNativeScript().bootstrapModule(AppModule)
});
