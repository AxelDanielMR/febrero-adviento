'use client';

import { AdvientoBox } from '@/components/AdvientoBox';

export default function TestDay10Page() {
  // Cajita idéntica al día 10 pero con fecha de apertura del 1 de febrero para pruebas
  const testDay = {
    day: 10,
    openDate: new Date('2026-02-01'), // Cambiado para que se pueda abrir inmediatamente
    reward: { 
      type: 'text' as const, 
      content: 'Hola amor, wenos días o noches si no esperaste a la mañana jejej\nFaltan todavía muchos días pero siento que el calendario está por terminarse jsjsj, me da nostalgia de alguna forma\nParezco disco rayado con esta pregunta pero ¿Qué te está pareciendo? Siéndote honesto siempre espero que en verdad te esté gustando mucho y estés muy feliz y emocionada por esto. Es algo que desde que se me ocurrió esperé con muchísima ilusión. Me encanta verte feliz, contenta, emocionada, y ser yo quien provoque eso me hace sentir muy alagado y muy muy feliz. Conforme voy llenando cada cajita, siento que se va volviendo más especial. Hay cosas que pienso que te gustarían y las hago, hay cosas que me dices que quieres y que considero meter jsjsj, hay cosas que pienso que me gustaría recibir de ti, como algunas fotos tuyas, una sesión para escuchar un disco que te guste y compartir ese momento, dedicárselo a la música y a nosotros. También eso me gusta de los cupones, más que un recurso fácil o una carta de "después te la cumplo" siento que es algo que nos llevamos para después de este calendario, para usarlo en un momento óptimo o importante (Spoiler: queda un último cupón). Creo que los desvelos, las giras de tuerca de lo que quería que fuera el regalo del día, las programadas de último momento le han dado un toque especial. No es una caja prefabricada, es algo que se va formando día con día, con retroalimentación, escucha y mucho pero mucho cariño. Para mí cada día es un recordatorio de lo mucho que te amo y de los esfuerzos que hago por tenerte cerca, por valorar a través de mis acciones tu compañía ¿Por qué darte una sola cosa cuando puedo darte 14? Jsjsj Me gusto tanto la idea que podría repetirla el siguiente año si nuestra relación sigue fortaleciéndose como lo está haciendo en estos momentos, en estos meses.\n\nLa verdad ya había pensado en una carta, cuando te pregunté que esperabas que estuviera en los próximos días dijiste varias cosas que no había pensado y unas que ya como esta. Quiero aprovechar esta ocasión para decir desde el fondo del corazón y de mis visceras te amo Itzia Arlett, te amo muchísimo Itzia Arlett. Gracias de verdad por tu cariño, comprensión, apoyo, alegría, vacilada, afecto, por tu deseo, por tu risa que tanto me gusta escuchar y sentir como se mueve tu cuerpo al ritmo de tu carcajada pegado a mi cuerpo, es un tesoro que amo visitar tan seguido.\n\nAmo escucharte cuando caes dormida, dormir juntos y comenzar el día juntos, creo que eso es de las cosa que más me gustan de dormir juntos, que uno va yepetando y ya tiene a su amorcita a lado ¿Qué es esto? ¿Navidad? Amo salir y caminar un buen, pasar a ver cosas, ver tu carita feliz por un rico café o un chocolatín sabroso, reirnos en los chinos y enojarnos porque a veces son unos hijos de la chingada jsjsjs. Pasar a tu casa, recogerte o quedarme ahí ajaja se invita solo. Cualquier cita contigo me hace tanta ilusión amor, ver tu sonrisita al estar caminando uno hacia el otro para encontrarnos y yo me pongo muy ayy abrazame mucho y besame mucho que te amo jsjsjs.\n\nEn verdad no solo espero si no que deseo que te esté gustando este regalo de San Valentín. Te atesoro y te valoro muchísimo amor, gracias por tanto, tiamo muchísimo amorcita espero tengas un lindo 10 de febrero <3' 
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 flex flex-col items-center justify-center p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-pink-700 text-center mb-4">
          Carta
        </h1>
        <p className="text-gray-600 text-center max-w-md">
          Esta es una página oculta para probar la carta del día 10 con la animación de escritura.
        </p>
      </div>
      
      <div className="flex justify-center">
        <AdvientoBox
          {...testDay}
          opened={false}
          onOpen={(day) => console.log(`Día ${day} abierto en modo prueba`)}
        />
      </div>
      
      <div className="mt-8 text-sm text-gray-500 text-center">
        <p>Esta cajita se puede abrir desde el 1 de febrero</p>
        <p>Fecha actual: {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
}