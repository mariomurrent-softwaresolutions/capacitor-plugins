import React, { useState } from 'react';
import {
  IonApp,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonInput,
  IonButton,
  IonFooter,
  setupIonicReact
} from '@ionic/react';
import { EdgeToEdge } from '@capawesome/capacitor-android-edge-to-edge-support';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

setupIonicReact();

function App() {
  const [statusBarColor, setStatusBarColor] = useState('#ffffff');
  const [navigationBarColor, setNavigationBarColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#808080');

  const handleEnable = async () => {
    try {
      await EdgeToEdge.enable();
      console.log('Edge to Edge enabled');
    } catch (error) {
      console.error('Error enabling Edge to Edge:', error);
    }
  };

  const handleDisable = async () => {
    try {
      await EdgeToEdge.disable();
      console.log('Edge to Edge disabled');
    } catch (error) {
      console.error('Error disabling Edge to Edge:', error);
    }
  };

  const handleGetInsets = async () => {
    try {
      const insets = await EdgeToEdge.getInsets();
      console.log('Insets:', insets);
      alert(`Insets: ${JSON.stringify(insets)}`);
    } catch (error) {
      console.error('Error getting insets:', error);
    }
  };

  const handleSetStatusBarColor = async () => {
    try {
      await EdgeToEdge.setStatusBarColor({ color: statusBarColor });
      console.log('Status bar color set to:', statusBarColor);
    } catch (error) {
      console.error('Error setting status bar color:', error);
    }
  };

  const handleSetNavigationBarColor = async () => {
    try {
      await EdgeToEdge.setNavigationBarColor({ color: navigationBarColor });
      console.log('Navigation bar color set to:', navigationBarColor);
    } catch (error) {
      console.error('Error setting navigation bar color:', error);
    }
  };

  const handleSetBackgroundColor = async () => {
    try {
      await EdgeToEdge.setBackgroundColor({ color: backgroundColor });
      console.log('Background color (both bars) set to:', backgroundColor);
    } catch (error) {
      console.error('Error setting background color:', error);
    }
  };

  return (
    <IonApp>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Edge To Edge Test App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonButton expand="block" onClick={handleEnable}>Enable</IonButton>
          </IonItem>
          <IonItem>
            <IonButton expand="block" onClick={handleDisable}>Disable</IonButton>
          </IonItem>
          <IonItem>
            <IonButton expand="block" onClick={handleGetInsets}>Get Insets</IonButton>
          </IonItem>
          
          <IonItem>
            <IonInput
              label="Status Bar Color"
              value={statusBarColor}
              onIonInput={(e) => setStatusBarColor(e.detail.value!)}
              placeholder="#ffffff"
            />
          </IonItem>
          <IonItem>
            <IonButton expand="block" onClick={handleSetStatusBarColor}>
              Set Status Bar Color
            </IonButton>
          </IonItem>
          
          <IonItem>
            <IonInput
              label="Navigation Bar Color"
              value={navigationBarColor}
              onIonInput={(e) => setNavigationBarColor(e.detail.value!)}
              placeholder="#000000"
            />
          </IonItem>
          <IonItem>
            <IonButton expand="block" onClick={handleSetNavigationBarColor}>
              Set Navigation Bar Color
            </IonButton>
          </IonItem>
          
          <IonItem>
            <IonInput
              label="Background Color (Both Bars)"
              value={backgroundColor}
              onIonInput={(e) => setBackgroundColor(e.detail.value!)}
              placeholder="#808080"
            />
          </IonItem>
          <IonItem>
            <IonButton expand="block" onClick={handleSetBackgroundColor}>
              Set Background Color (Legacy)
            </IonButton>
          </IonItem>
        </IonList>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonTitle>Footer</IonTitle>
        </IonToolbar>
      </IonFooter>
    </IonApp>
  );
}

export default App;
