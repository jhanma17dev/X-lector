<template>
  <div class="container mx-auto py-8 px-4">
    <header class="mb-8 text-center">
      <h1 class="text-3xl font-bold tracking-tight mb-2">Análisis Exploratorio de Datos</h1>
      <p class="text-xl text-muted-foreground">EDA: procesamiento y exploración de imágenes</p>
    </header>

    <div class="w-full">
      <!-- Tabs navigation -->
      <div class="tabs-list grid w-full grid-cols-4 mb-4">
        <button
          class="tab-trigger p-2"
          :class="{ 'active bg-primary text-white': activeTab === 'contexto' }"
          @click="activeTab = 'contexto'"
        >
          Contextualización
        </button>
        <button
          class="tab-trigger p-2"
          :class="{ 'active bg-primary text-white': activeTab === 'preprocesamiento' }"
          @click="activeTab = 'preprocesamiento'"
        >
          Preprocesamiento
        </button>
        <button
          class="tab-trigger p-2"
          :class="{ 'active bg-primary text-white': activeTab === 'analisis' }"
          @click="activeTab = 'analisis'"
        >
          Análisis Descriptivo
        </button>
        <button
          class="tab-trigger p-2"
          :class="{ 'active bg-primary text-white': activeTab === 'performance' }"
          @click="activeTab = 'performance'"
        >
          Análisis de Rendimiento
        </button>
      </div>

      <!-- Sección de Contextualización -->
      <div v-if="activeTab === 'contexto'" class="card border rounded-lg shadow">
        <div class="card-header p-4 border-b">
          <h2 class="card-title text-xl font-semibold mb-4">Contextualización de los Datos</h2>
          <p class="card-description text-muted-foreground">
            La <strong>osteoartritis de rodilla (KOA)</strong> es una enfermedad articular
            comúnmente observada en todo el mundo, principalmente en la población adulta (WHO
            Scientific Group on the Epidemiology of Aging, 1984). Las personas que la padecen
            experimentan síntomas como dolor persistente, hinchazón, rigidez matutina y problemas en
            el control postural, afectando significativamente la realización de actividades diarias
            (Kalo et al., 2022). La frecuencia del padecimiento de esta enfermedad incluyendo otras
            articulaciones distintas además de la rodilla aumenta con la edad, hay reportes que
            indican una incidencia del 80% de personas con 65 años e incluso el 95% en edades
            superiores. Además, la OA es la enfermedad crónica más común en ancianos, por lo cual,
            con el aumento de la expectativa de vida en generaciones futuras de la población, se
            espera que la frecuencia aumente (Mendoza-Castaño et al., 2011).

            <br />
            <br />

            El conjunto de datos utilizado en este estudio está compuesto por
            <strong>imágenes de Rayos X</strong> clasificadas en cinco categorías: normal, dudosa,
            leve, moderada y severa. Estas imágenes pueden ser utilizadas en tareas de
            <strong>clasificación, detección y segmentación</strong>, y han demostrado ser altamente
            efectivas cuando se combinan con técnicas de aprendizaje automático.
          </p>
        </div>
        <div class="card-content p-6 grid gap-6">
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <h3 class="text-lg font-medium mb-2">Origen de los Datos</h3>
              <p class="text-muted-foreground mb-4">
                Este conjunto de datos fue recopilado en <strong>2018</strong> e incluye
                <strong>1650 imágenes</strong> en formato <strong>PNG</strong> con un tamaño medio
                de 500x500 píxeles, provenientes de distintos pacientes con sospechas de la
                enfermedad. Chen, Pingjun (2018), “Knee Osteoarthritis Severity Grading Dataset”,
                Mendeley Data, V1, doi: 10.17632/56rmx5bjcr.1
              </p>
              <h3 class="text-lg font-medium mb-2">Características del Conjunto de Datos</h3>
              <ul class="list-disc pl-5 space-y-1 text-muted-foreground">
                <li>Total de imágenes: 1650</li>
                <li>Grados de KOA (escala Kellgren-Lawrence): 0-4</li>
                <li>Resolución de imágenes: 500x500 píxeles</li>
              </ul>
            </div>

            <div class="flex flex-col items-center justify-center">
              <img
                src="https://raw.githubusercontent.com/sebastianpadilla02/Chatbot_telegram/refs/heads/main/image_artrits.png"
                alt="Distribución de datos KOA"
                class="rounded-lg mb-2"
                width="400"
                height="300"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Sección de Preprocesamiento -->
      <div
        v-if="activeTab === 'preprocesamiento'"
        class="card border rounded-lg shadow overflow-hidden"
      >
        <div class="card-header p-4 border-b">
          <h2 class="card-title text-xl font-semibold">Preprocesamiento de Imágenes</h2>
          <p class="card-description text-muted-foreground">
            Técnicas aplicadas para preparar las imágenes para el análisis
          </p>
        </div>
        <div class="card-content p-6 grid gap-6">
          <div class="flex flex-col">
            <h3 class="text-lg font-medium">Librerias y modulos necesarios</h3>
            <!-- Sección de código -->
            <pre
              class="bg-base-100 rounded-lg text-left inline-block whitespace-pre overflow-x-auto max-w-full"
            >
                <prism language="python" class="rounded-lg block">
  import cv2
  import numpy as np
  from skimage import filters, measure
  from skimage.color import rgb2gray
  from skimage.filters import gaussian
                </prism>
              </pre>
          </div>

          <div class="flex flex-col">
            <h3 class="text-lg font-medium mb-2">Conjunto de datos(Imágenes)</h3>
            <p class="text-muted-foreground mb-4">
              Primero, se cargan las imágenes que conforman el conjunto de datos, las cuales están
              previamente clasificadas en tres categorías según el tipo de diagnóstivo dado a los
              pacientes: <strong>Normal(Sin enfermedad), Dudoso, Leve, Moderada y Severa.</strong>
            </p>

            <pre
              class="bg-base-100 rounded-lg text-left inline-block whitespace-pre margin-x-auto max-w-full overflow-x-auto"
            >
                <prism language="python" class="rounded-lg block">
  #Ruta principal de las imagenes
  data_path = 'archive2'

  # Definición de las clases o categorias de las imagenes(Nombre de carpetas)
  categorias = ['0', '1', '2', '3', '4']

  nombres_categorias = ['Normal', 'Dudoso', 'Leve', 'Moderado', 'Severo']
                </prism>
              </pre>

            <pre
              class="bg-base-100 rounded-lg text-left inline-block whitespace-pre margin-x-auto max-w-full overflow-x-auto"
            >
                <prism language="python" class="rounded-lg block">
  import shutil

  # Crear carpetas destino para cada clase (0 a 4)
  output_base = 'unidas_por_clase'
  os.makedirs(output_base, exist_ok=True)
  for i in range(5):
      os.makedirs(os.path.join(output_base, str(i)), exist_ok=True)

  # Recorrer las 4 carpetas principales en data_path
  for carpeta_principal in os.listdir(data_path):
      ruta_principal = os.path.join(data_path, carpeta_principal)
      if os.path.isdir(ruta_principal):
          # Recorrer las subcarpetas (0 a 4)
          for subcarpeta in os.listdir(ruta_principal):
              ruta_subcarpeta = os.path.join(ruta_principal, subcarpeta)
              if os.path.isdir(ruta_subcarpeta) and subcarpeta.isdigit():
                  destino = os.path.join(output_base, subcarpeta)
                  # Copiar todas las imágenes de la subcarpeta al destino correspondiente
                  for archivo in os.listdir(ruta_subcarpeta):
                      origen = os.path.join(ruta_subcarpeta, archivo)
                      if os.path.isfile(origen):
                          nombre_destino = f"{carpeta_principal}_{archivo}"
                          ruta_destino = os.path.join(destino, nombre_destino)
                          # Copiar archivo
                          shutil.copy(origen, ruta_destino)
                </prism>
              </pre>

            <pre
              class="bg-base-100 rounded-lg text-left inline-block whitespace-pre margin-x-auto max-w-full overflow-x-auto"
            >
                <prism language="python" class="rounded-lg block">
  #Cambiar el nombre de las carpetas dentro de unidas_por_clase a las de nombres_categorias
  for i, nombre in enumerate(nombres_categorias):
      ruta_carpeta = os.path.join(output_base, str(i))
      nuevo_nombre = os.path.join(output_base, nombre)
      os.rename(ruta_carpeta, nuevo_nombre)

                </prism>
              </pre>
          </div>

          <div class="flex flex-col">
            <h3 class="text-lg font-medium mb-2">Visualización inicial de imágenes</h3>
            <p class="text-muted-foreground mb-4">
              El siguiente proceso se lleva a cabo para visualizar las primeras imágenes de cada
              carpeta correspondiente a los diagnósticos de osteoartritis, con el objetivo de
              analizar el estado original de las imágenes, sus canales de color, dimensiones y otros
              atributos importantes.
            </p>

            <pre
              class="bg-base-100 rounded-lg text-left inline-block whitespace-pre margin-x-auto max-w-full overflow-x-auto"
            >
                <prism language="python" class="rounded-lg block">
  categorias = ['Normal', 'Dudoso', 'Leve', 'Moderado', 'Severo']
  data_path = 'unidas_por_clase'
  fig, axes = plt.subplots(2, len(categorias), figsize = (8, 3))

  for i, categoria in enumerate(categorias):
      img_path = os.path.join(data_path, categoria)
      img = plt.imread(os.path.join(img_path, os.listdir(img_path)[0]))
      axes[0, i].imshow(img)
      axes[0, i].axis('off')
      axes[0, i].set_title(nombres_categorias[i])
      
      img = plt.imread(os.path.join(img_path, os.listdir(img_path)[1]))
      axes[1, i].imshow(img)
      axes[1, i].axis('off')
      axes[1, i].set_title(nombres_categorias[i])

  plt.tight_layout()
  plt.show()

                </prism>
              </pre>

            <!-- Sección de visualización de imágenes -->
            <div class="flex flex-col items-center justify-center">
              <img
                src="@/assets/eda-images/Visualizacion_inicial.png"
                alt="Imagen de Osteoartritis"
                class="rounded-lg mb-2"
                width="800"
                height="600"
              />
            </div>

            <p class="text-muted-foreground mt-4">
              En la imagen, se presentan las primeras muestras de cada categoría de KOA. Se puede
              observar a simple vista que las imagenes tienen dimensiones iguales, sin importar la
              clase a la que pertenezcan.
            </p>
          </div>

          <div class="flex flex-col mt-6">
            <h3 class="text-lg font-medium mb-2">Cantidad de imagenes</h3>
            <p class="text-muted-foreground mb-4">
              Ahora veamos la cantidad de imágenes que tenemos en cada clase.
            </p>

            <pre
              class="bg-base-100 rounded-lg text-left inline-block whitespace-pre margin-x-auto max-w-full overflow-x-auto"
            >
              <prism language="python" class="rounded-lg block">
  conteo_imagenes = {}
  total_imagenes = 0

  # Contar imágenes en cada categoría
  for i in categorias:
      ruta_categoria = os.path.join(data_path, i)
      imagenes = glob(os.path.join(ruta_categoria, "*.png"))  # Obtener todas las imágenes
      conteo_imagenes[i] = len(imagenes)
      total_imagenes += conteo_imagenes[i]
      
  for categoria, cantidad in conteo_imagenes.items():
      print(f"La cantidad de imágenes en la categoría {categoria.capitalize()} es de {cantidad} imágenes")

  print(f"\nTotal de imágenes: {total_imagenes}")
              </prism>
            </pre>

            <pre
              class="bg-[#2d2d2d] rounded-lg text-left inline-block whitespace-pre margin-x-auto max-w-full overflow-x-auto"
            >
              <code class="rounded-lg block">
  La cantidad de imágenes en la categoría Normal es de 3857 imágenes
  La cantidad de imágenes en la categoría Dudoso es de 1770 imágenes
  La cantidad de imágenes en la categoría Leve es de 2578 imágenes
  La cantidad de imágenes en la categoría Moderado es de 1286 imágenes
  La cantidad de imágenes en la categoría Severo es de 295 imágenes

  Total de imágenes: 9786
              </code>
            </pre>

            <p class="text-muted-foreground mt-4">
              En este proceso, contamos con un total de 9786 imágenes, distribuidas de la siguiente
              manera: 3857 corresponden a la categoría Normal, 1770 a dudoso, 2578 a leve, 1286 a
              moderado y 295 a severo o grave. Se observa un desbalanceo claro en cada categoría que
              se manejará más adelante.
            </p>
          </div>

          <div class="flex flex-col mt-6">
            <h3 class="text-lg font-medium mb-2">Organización de imágenes en un DataFrame</h3>
            <p class="text-muted-foreground mb-4">
              Ahora vamos a almacenar las imágenes en un DataFrame con el objetivo de facilitar su
              análisis y procesamiento. Cada imagen será representada en su formato de píxeles y
              convertida a escala RGB para asegurar coherencia en la manipulación de datos. El
              DataFrame permitirá realizar transformaciones, exploraciones y futuras aplicaciones en
              modelos de análisis de imágenes.
            </p>

            <pre
              class="bg-base-100 rounded-lg text-left inline-block whitespace-pre margin-x-auto max-w-full overflow-x-auto"
            >
              <prism language="python" class="rounded-lg block">
  # Función para extraer números de los nombres de archivo y ordenarlos correctamente
  def extraer_numero(nombre_archivo):
      coincidencia = re.search(r'\d+', nombre_archivo)
      return int(coincidencia.group()) if coincidencia else float('inf')

  # Lista para almacenar la información de las imágenes
  datos_imagenes = []

  for categoria in categorias:
      ruta_categoria = os.path.join(data_path, categoria)
      archivos_imagenes = glob(os.path.join(ruta_categoria, "*.png"))

      # Ordenar las imágenes por el número extraído de su nombre
      archivos_imagenes = sorted(archivos_imagenes, key=extraer_numero)

      for ruta_imagen in archivos_imagenes:
          # Cargar la imagen original en formato BGR y convertirla a RGB
          imagen = cv2.imread(ruta_imagen)
          imagen = cv2.cvtColor(imagen, cv2.COLOR_BGR2RGB)

          # Obtener las dimensiones de la imagen
          dimensiones = imagen.shape[:3]

          # Almacenar la información en la lista
          datos_imagenes.append({
              'Imagen': imagen,
              'Dimensiones': dimensiones,
              'Etiqueta': categoria  
          })

  # Crear el DataFrame
  df = pd.DataFrame(datos_imagenes)

  # Mostrar el DataFrame
  df
              </prism>
            </pre>

            <div class="flex flex-col items-center justify-center mb-8">
              <img
                src="@/assets/eda-images/tabla-dataframe.png"
                alt="Imagen de Osteoartritis"
                class="rounded-lg mb-2"
                width="500"
                height="600"
              />
            </div>

            <p class="text-muted-foreground mb-4">
              Nótese que ahora se encuentran las imágenes almacenadas en una estructura más comóda.
              Como datos relevantes, nótese también que todas las imágenes cuentan con 3 canales de
              color (RGB).

              <br />
              <br />

              El conjunto de datos cuenta con 9786 observaciones, organizadas en 3 filas.
            </p>

            <pre
              class="bg-[#2d2d2d] rounded-lg text-left inline-block whitespace-pre margin-x-auto max-w-full overflow-x-auto"
            >
              <code class="rounded-lg block">
  df.info()

  RangeIndex: 9786 entries, 0 to 9785
  Data columns (total 3 columns):
  #   Column       Non-Null Count  Dtype 
  ---  ------       --------------  ----- 
  0   Imagen       9786 non-null   object
  1   Dimensiones  9786 non-null   object
  2   Etiqueta     9786 non-null   object
  dtypes: object(3)
  memory usage: 229.5+ KB
              </code>
            </pre>

            <p class="text-muted-foreground my-4">
              Se observa como no se presentan valores nulos o faltantes al llevar las iamgenes a un
              dataframe.
            </p>

            <pre
              class="bg-[#2d2d2d] rounded-lg text-left inline-block whitespace-pre margin-x-auto max-w-full overflow-x-auto"
            >
              <code class="rounded-lg block">
  df['Dimensiones'].value_counts()

  Dimensiones
  (224, 224, 3)    9786
  Name: count, dtype: int64
              </code>
            </pre>

            <p class="text-muted-foreground mt-8">
              Ahora vamos a almacenar las imágenes en un DataFrame con el objetivo de facilitar su
              análisis y procesamiento. Cada imagen será representada en su formato de píxeles y
              convertida a escala RGB para asegurar coherencia en la manipulación de datos. El
              DataFrame permitirá realizar transformaciones, exploraciones y futuras aplicaciones en
              modelos de análisis de imágenes.
            </p>

            <pre
              class="bg-base-100 rounded-lg text-left inline-block whitespace-pre margin-x-auto max-w-full overflow-x-auto"
            >
              <prism language="python" class="rounded-lg block">
  def mostrar_imagen(fila):
    # Extraer la imagen y las máscaras
    imagen = fila["Imagen"]  # Imagen original
    
    imagenes = [imagen]
    titulos = [f'Imagen original - {fila["Etiqueta"]}']

    # Crear la figura con subplots dinámicos
    fig, axes = plt.subplots(1, len(imagenes), figsize = (5 * len(imagenes), 5))

    # Si solo hay una imagen, hacer que 'axes' sea iterable
    if len(imagenes) == 1:
        axes = [axes]

    # Mostrar cada imagen
    for ax, img, title in zip(axes, imagenes, titulos):
        ax.imshow(img if img is not None else [[0]], None)
        ax.set_title(title)
        ax.axis("off")
    
    plt.show()
              </prism>
            </pre>
          </div>
        </div>
      </div>

      <!-- Sección de Análisis Descriptivo -->
      <div v-if="activeTab === 'analisis'" class="card border rounded-lg shadow">
        <div class="card-header p-4 border-b">
          <h2 class="card-title text-xl font-semibold">Análisis descriptivo de imágenes</h2>
          <p class="card-description text-muted-foreground">
            En esta sección veremos un poco más sobre cómo están distribuidas las clases, los
            píxeles y colores del conjunto de imágenes.
          </p>
        </div>
        <div class="card-content p-6 grid gap-6">
          <div class="flex flex-col mt-6">
            <h3 class="text-lg font-medium mb-2">Distribución de clases</h3>
            <p class="text-muted-foreground mb-4">
              Inicialmente, veamos la distribución de las clases de nuestro conjunto de datos.
            </p>

            <pre
              class="bg-base-100 rounded-lg text-left inline-block whitespace-pre margin-x-auto max-w-full overflow-x-auto"
            >
              <prism language="python" class="rounded-lg block">
  class_counts = df["Etiqueta"].value_counts()
  fig, axes = plt.subplots(1, 2, figsize=(14, 5))  

  ax = sns.barplot(x = class_counts.index, y = class_counts.values, palette = "rocket", ax = axes[0])

  # Agregar valores en las barras
  for i, value in enumerate(class_counts.values):
      ax.text(i, value + 1, str(value), ha='center', fontsize = 12, fontweight = 'bold')

  axes[0].set_xlabel("Clases")
  axes[0].set_ylabel("Número de imágenes")
  axes[0].set_title("Distribución de Clases")

  axes[1].pie(
    class_counts, 
    labels = class_counts.index, 
    autopct = '%1.1f%%', 
    colors = sns.color_palette("rocket"), 
    startangle = 140, 
    wedgeprops={'edgecolor': 'black'}
  )
  axes[1].set_title("Proporción de Clases")
  for text in axes[1].texts:
      if '%' in text.get_text():  # Si es un porcentaje (valor dentro del gráfico)
          text.set_color('white')  
  plt.tight_layout()
  plt.show()
              </prism>
            </pre>

            <div class="flex flex-col items-center justify-center mb-8">
              <img
                src="@/assets/eda-images/distribucion-de-clases.png"
                alt="Imagen de Osteoartritis"
                class="rounded-lg mb-2"
                width="800"
                height="600"
              />
            </div>

            <p class="text-muted-foreground mb-4">
              Al observar los gráficos, se puede decir que hay un desbalance en las clases, ya que
              las categorías Normal y Leve representan la mayoría de las imágenes (65.7%), mientras
              que las tres clases restantes tienen un debsalance claro también con un con 18.1% para
              dudoso, 13.1% para Moderado y la clase Severo es donde menos se tienen observaciones,
              con solo un 3% del total. Esto se refleja en el gráfico de barras, donde entre cada
              clase va bajando significativamente las observaciones. Además en el gráfico de pastel,
              se nota una disparidad clara en la distribución de los datos. Este desbalance puede
              afectar el rendimiento del modelo de clasificación, ya que puede ser vulnerable a
              sesgos hacia las clases mayoritarias, disminuyendo la detección de las clases
              minoritarias.
            </p>
          </div>

          <div class="flex flex-col mt-6">
            <h3 class="text-lg font-medium mb-2">Mapa de intensidad de pixeles</h3>
            <p class="text-muted-foreground mb-4">
              Para comprender mejor la distribución de los valores de los píxeles en nuestras
              imágenes, visualizaremos un mapa de intensidad. Este tipo de gráfico nos permite
              identificar patrones en la luminosidad y contraste, resaltando áreas de mayor y menor
              intensidad en una imagen. Convertiremos la imagen a escala de grises si es necesario y
              aplicaremos un heatmap para representar la variación en los niveles de intensidad de
              los píxeles. Esto es útil para detectar características relevantes en el procesamiento
              y análisis de imágenes.
            </p>

            <pre
              class="bg-base-100 rounded-lg text-left inline-block whitespace-pre margin-x-auto max-w-full overflow-x-auto"
            >
              <prism language="python" class="rounded-lg block">
  # Seleccionar una imagen del DataFrame
  imagen = df["Imagen"].iloc[0]  # Tomamos la primera imagen como ejemplo

  # Si la imagen es en color (RGB), la convertimos a escala de grises
  if imagen.ndim == 3 and imagen.shape[-1] == 3:  # Vetificar si la imagen es a color
      imagen_gris = cv2.cvtColor(imagen, cv2.COLOR_RGB2GRAY)  # Conversión a escala de grises
  else:
      imagen_gris = imagen  # Si ya está en escala de grises, se mantiene igual

  # Graficar el heatmap para visualizar la intensidad de los píxeles
  plt.figure(figsize=(8, 6))  # Definir tamaño de la figura
  sns.heatmap(imagen_gris, cmap="rocket", cbar=True)  # Crear heatmap con la escala de colores "rocket"
  plt.title("Mapa de Intensidad de Píxeles")  # Agregar título al gráfico
  plt.axis("off")  # Ocultar los ejes para una mejor visualización
  plt.show()
              </prism>
            </pre>

            <div class="flex flex-col items-center justify-center mb-8">
              <img
                src="@/assets/eda-images/mapa-de-intensidad.png"
                alt="Imagen de Osteoartritis"
                class="rounded-lg mb-2"
                width="400"
                height="600"
              />
            </div>

            <p class="text-muted-foreground mb-4">
              La imagen nos muestra el mapa de intensidad de píxeles de la primera imagen del
              conjunto de datos, la cual corresponde a la clase normal. Se representa en escala de
              colores, donde los tonos más oscuros indican áreas de menor intensidad y los más
              claros corresponden a regiones de mayor intensidad. Este análisis es útil para
              identificar patrones visuales que ayuden en la evaluación y diagnóstico de imágenes
              médicas.
            </p>
          </div>

          <div class="flex flex-col mt-6">
            <h3 class="text-lg font-medium mb-2">Histograma de escala de grises</h3>
            <p class="text-muted-foreground mb-4">
              Exploremos cómo se representa la distribución de intensidades en una imagen en escala
              de grises a través de un histograma. Este gráfico nos permite visualizar la frecuencia
              de los diferentes niveles de brillo, lo que ayuda a analizar el contraste y la calidad
              de la imagen.
            </p>

            <pre
              class="bg-base-100 rounded-lg text-left inline-block whitespace-pre margin-x-auto max-w-full overflow-x-auto"
            >
              <prism language="python" class="rounded-lg block">
  imagen = df.iloc[0]["Imagen"]

  def mostrar_imagen_histograma(image):
    # Convertir la imagen de BGR a escala de grises
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Calcular el histograma de la imagen en escala de grises
    gray_histogram = cv2.calcHist([gray_image], [0], None, [256], [0, 256])

    # Crear una figura con dos subgráficos: uno para la imagen y otro para el histograma
    fig, axs = plt.subplots(1, 2, figsize=(12,6))

    # Mostrar la imagen original en el primer subgráfico (convertida a RGB para visualizarla correctamente)
    axs[0].imshow(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))
    axs[0].set_title('Imagen Original', fontsize=14)
    axs[0].axis('off')  # Ocultar ejes para una mejor visualización

    # Graficar el histograma en el segundo subgráfico
    axs[1].plot(gray_histogram, color='gray')
    axs[1].set_title('Histograma de Escala de Grises', fontsize=14)
    axs[1].set_xlabel('Valor de Píxel', fontsize=14)
    axs[1].set_ylabel('Frecuencia', fontsize=14)

    plt.tight_layout()
    plt.show()

  mostrar_imagen_histograma(imagen)
              </prism>
            </pre>

            <div class="flex flex-col items-center justify-center mb-8">
              <img
                src="@/assets/eda-images/histograma-escala-grises.png"
                alt="Imagen de Osteoartritis"
                class="rounded-lg mb-2"
                width="800"
                height="600"
              />
            </div>

            <p class="text-muted-foreground mb-4">
              En la imagen original, se observa como el área más iluminada corresponde a los huesos
              de la rodilla que se están analizando, las áreas más grises corresponden a la parte de
              la pierna que no contiene a los huesos, en cambio la parte oscura es donde no hay nada
              a analizar. El histograma a la derecha ilustra la distribución de los valores de
              píxeles en la imagen en la escala de grises. Se observa que hay mayor concentración de
              píxeles en los rangos de intensidad media (valores entre aproximadamente 100 y 200),
              lo que indica una predominancia de tonos oscuros y grises. Además se pueden notar
              picos en los niveles de intensidad alrededor de 150, que corresponden a los valores
              más representativos en la imagen.
            </p>
          </div>

          <div class="flex flex-col mt-6">
            <h3 class="text-lg font-medium mb-2">Filtrado de imágenes con OpenCV</h3>
            <p class="text-muted-foreground mb-4">
              A continuación se hará un filtrado de imágenes. Los filtros en imágenes son
              operaciones matemáticas aplicadas sobre los píxeles para modificar ciertas
              características visuales, se pueden usar para mejorar contraste, eliminar ruido o
              detectar bordes. En este caso, se emplean filtros de suavizado para reducir el ruido
              presente en la imagen original. El filtrado de imágenes es un proceso fundamental en
              la visión por computadora, ya que permite mejorar la calidad de las imágenes
              eliminando ruido, resaltando características importantes y suavizando detalles no
              deseados.

              <strong>Tipos de filtros aplicados</strong>
            </p>

            <ul class="list-disc pl-5 space-y-1 text-muted-foreground">
              <li>
                <strong>Filtro de Media (cv2.blur):</strong> Calcula el promedio de los valores 
                de píxeles en una vecindad definida por una ventana (en este caso, de 3x3). 
                Suaviza la imagen pero puede afectar los bordes.
              </li>
              <li>
                <strong>Filtro de Mediana (cv2.medianBlur):</strong> Sustituye el valor de cada 
                píxel por la mediana de los valores en su vecindad. Es especialmente útil para 
                eliminar ruido impulsivo o “ruido sal y pimienta” (píxeles blancos (sal) y píxeles 
                negros (pimienta))
              </li>
              <li>
                <strong>Filtro Gaussiano (cv2.GaussianBlur):</strong> Aplica un suavizado utilizando 
                una función gaussiana, lo que genera un efecto más natural y mantiene mejor los 
                bordes en comparación con el filtro de media.
              </li>
            </ul>

            <pre
              class="bg-base-100 rounded-lg text-left inline-block whitespace-pre margin-x-auto max-w-full overflow-x-auto"
            >
              <prism language="python" class="rounded-lg block">
  def aplicar_filtros_y_visualizar(imagen):
    # Aplicación de filtros
    meanimg = cv2.blur(imagen, (3, 3))  # Filtro de media
    medianimg = cv2.medianBlur(imagen, 3)  # Filtro de mediana
    gaussianimg = cv2.GaussianBlur(imagen, (3, 3), 0)  # Filtro gaussiano

    # Creación de la figura con subgráficos 2x2
    fig, axs = plt.subplots(2, 2, figsize=(10, 8))

    # Imagen Original con Ruido
    axs[0, 0].imshow(cv2.cvtColor(imagen, cv2.COLOR_BGR2RGB))
    axs[0, 0].set_title('Imagen con Ruido', fontsize=14)
    axs[0, 0].axis('off')

    # Filtro Media
    axs[0, 1].imshow(cv2.cvtColor(meanimg, cv2.COLOR_BGR2RGB))
    axs[0, 1].set_title('Filtro Media', fontsize=14)
    axs[0, 1].axis('off')

    # Filtro Mediana
    axs[1, 0].imshow(cv2.cvtColor(medianimg, cv2.COLOR_BGR2RGB))
    axs[1, 0].set_title('Filtro Mediana', fontsize=14)
    axs[1, 0].axis('off')

    # Filtro Gaussiano
    axs[1, 1].imshow(cv2.cvtColor(gaussianimg, cv2.COLOR_BGR2RGB))
    axs[1, 1].set_title('Filtro Gaussiano', fontsize=14)
    axs[1, 1].axis('off')

    # Ajustar diseño y mostrar
    plt.tight_layout()
    plt.show()

  aplicar_filtros_y_visualizar(imagen)
              </prism>
            </pre>

            <div class="flex flex-col items-center justify-center mb-8">
              <img
                src="@/assets/eda-images/filtro-open-cv.png"
                alt="Imagen de Osteoartritis"
                class="rounded-lg mb-2"
                width="800"
                height="600"
              />
            </div>

            <p class="text-muted-foreground mb-4">
              La imagen muestra una comparación del efecto de diferentes filtros de suavizado aplicados 
              a una imagen radiográfica de la rodilla. En la esquina superior izquierda se observa la 
              imagen original con ruido, que puede dificultar la interpretación médica al introducir 
              artefactos visuales. En la parte superior derecha, el filtro de media ha suavizado la 
              imagen promediando los valores de los píxeles vecinos, reduciendo el ruido pero también 
              perdiendo algunos detalles. En la parte inferior izquierda, el filtro de mediana ha 
              preservado mejor los bordes y estructuras relevantes, eliminando especialmente el ruido 
              tipo sal y pimienta. Finalmente, en la esquina inferior derecha, el filtro gaussiano ha 
              suavizado la imagen de manera más natural, manteniendo un balance entre reducción de ruido 
              y preservación de detalles.

              <br />
              <br />

              Otro tipo de filtrado es el usado para la detección de bordes, que en este contexto es 
              importante para visualizar que tan cerca se presentan los huesos, tomaremos como referencia 
              el siguiente filtro:
            </p>

            <ul class="list-disc pl-5 space-y-1 text-muted-foreground">
              <li>
                <strong>Filtro de Sobel (cv2.Sobel):</strong> Detecta bordes en direcciones específicas 
                (horizontal o vertical). Se aplica en derivadas de primer orden en X e Y.
              </li>
            </ul>

            <br />

            <p class="text-muted-foreground mb-4">
              Así, se visualizará una imagen con el filtro de sobel para cada eje y una versión combinada 
              que consiste en calcular la magnitud del gradiente combinado entre los filtors para x y 
              para y
            </p>

            <pre
              class="bg-base-100 rounded-lg text-left inline-block whitespace-pre margin-x-auto max-w-full overflow-x-auto"
            >
              <prism language="python" class="rounded-lg block">
  def aplicar_filtros_de_bordes_y_visualizar(imagen):
    # Aplicación de filtros
    sobelx = cv2.Sobel(imagen, cv2.CV_64F, 1, 0, ksize=3)  # Bordes en X
    sobely = cv2.Sobel(imagen, cv2.CV_64F, 0, 1, ksize=3)  # Bordes en Y

    # Calcular la magnitud del gradiente combinando sobelx y sobely
    sobel_combinado = cv2.magnitude(sobelx, sobely)

    # Normalizar la imagen para mostrarla correctamente
    sobel_combinado = np.uint8(sobel_combinado)

    # Normalizar y convertir a uint8
    sobelx = cv2.normalize(sobelx, None, 0, 255, cv2.NORM_MINMAX)
    sobelx = np.uint8(sobelx)

    sobely = cv2.normalize(sobely, None, 0, 255, cv2.NORM_MINMAX)
    sobely = np.uint8(sobely)

    # Creación de la figura con subgráficos 2x2
    fig, axs = plt.subplots(2, 2, figsize=(10, 6))

    # Imagen Original con Ruido
    axs[0, 0].imshow(cv2.cvtColor(imagen, cv2.COLOR_BGR2RGB))
    axs[0, 0].set_title('Imagen con Ruido', fontsize=14)
    axs[0, 0].axis('off')

    # Filtro Media
    axs[0, 1].imshow(cv2.cvtColor(sobelx, cv2.COLOR_BGR2RGB))
    axs[0, 1].set_title('Filtro Sobel para eje x', fontsize=14)
    axs[0, 1].axis('off')

    # Filtro Mediana
    axs[1, 0].imshow(cv2.cvtColor(sobely, cv2.COLOR_BGR2RGB))
    axs[1, 0].set_title('Filtro Sobel para eje y', fontsize=14)
    axs[1, 0].axis('off')

    # Filtro Gaussiano
    axs[1, 1].imshow(cv2.cvtColor(sobel_combinado, cv2.COLOR_BGR2RGB))
    axs[1, 1].set_title('Filtro sobel combinado', fontsize=14)
    axs[1, 1].axis('off')
  
  aplicar_filtros_de_bordes_y_visualizar(imagen)
              </prism>
            </pre>

            <div class="flex flex-col items-center justify-center mb-8">
              <img
                src="@/assets/eda-images/filtro-sobel.png"
                alt="Imagen de Osteoartritis"
                class="rounded-lg mb-2"
                width="800"
                height="600"
              />
            </div>

            <p class="text-muted-foreground mb-4">
              En la imagen se observa una comparación del efecto del filtro de detección de bordes 
              Sobel aplicado a una imagen de rodilla. Para el filtro sobre el eje x, se notan mas los 
              bordes verticales en la imagen; en cambio, para el eje y se resaltan los bordes 
              horizontales como por ejemplo los contornos de la separación que se presenta en los huesos. 
              Por último, el filtro combinado oscurece por completo la imagen con ruido y resalta todos 
              los bordes de los huesos, por lo que se hace más fácil para visualizar y detectar los tipos 
              de artritis.
            </p>
          </div>

          <div class="flex flex-col mt-6">
            <h3 class="text-lg font-medium mb-2">Redimensión de imágenes</h3>
            <p class="text-muted-foreground mb-4">
              Redimensionar las imágenes es fundamental en el procesamiento de datos, ya que garantiza 
              que todas tengan un tamaño uniforme, reduce el costo computacional y facilita su uso en 
              modelos de Deep Learning. Al ajustar las dimensiones, se evita el problema de trabajar con 
              imágenes de diferentes tamaños, lo que mejora la eficiencia y compatibilidad. Además, 
              redimensionarlas ayuda a optimizar el uso de memoria y acelera el entrenamiento sin 
              afectar significativamente la calidad visual.
            </p>

            <pre
              class="bg-base-100 rounded-lg text-left inline-block whitespace-pre margin-x-auto max-w-full overflow-x-auto"
            >
              <prism language="python" class="rounded-lg block">
  target_size = (256, 256)
  # Redimensionar todas las imágenes
  df["Imagen"] = df["Imagen"].apply(lambda img: cv2.resize(img, target_size))
              </prism>
            </pre>

            <p class="text-muted-foreground mb-4">
              Al inicio de este análisis exploratorio, observamos que varias imágenes de diferentes 
              clases presentaban variaciones en tamaño. Ahora, tras un proceso de preprocesamiento, 
              todas las imágenes han sido normalizadas a un tamaño uniforme, lo que facilita su 
              comparación y análisis.
            </p>

          </div>

          <div class="flex flex-col mt-6">
            <h3 class="text-lg font-medium mb-2">Escalado de pixeles</h3>
            <p class="text-muted-foreground mb-4">
              En esta sección, escalaremos los valores de los píxeles de nuestras imágenes para 
              estandarizar su rango y mejorar el rendimiento de los modelos de aprendizaje automático. 
              La normalización de los píxeles es crucial, ya que muchos algoritmos de visión por 
              computadora funcionan mejor cuando los valores están en un rango uniforme, como [0,1] o 
              [-1,1]. Antes de realizar este escalado, primero verificamos que los valores de los 
              píxeles de la imagen original y su máscara efectivamente se encuentran en el rango de 
              0 a 255. Para ello, calculamos métricas estadísticas como el valor mínimo, el máximo, 
              la media y la desviación estándar, lo que nos permite asegurarnos de que la escala de 
              los datos es la esperada antes de aplicar cualquier transformación.
            </p>

            <pre
              class="bg-base-100 rounded-lg text-left inline-block whitespace-pre margin-x-auto max-w-full overflow-x-auto"
            >
              <prism language="python" class="rounded-lg block">
  print("Mínimo:", np.min(imagen))
  print("Máximo:", np.max(imagen))
  print("Media:", np.mean(imagen))
  print("Desviación estándar:", np.std(imagen))

  Mínimo: 35
  Máximo: 229
  Media: 138.61154735331633
  Desviación estándar: 48.26620379065913
              </prism>
            </pre>

            <p class="text-muted-foreground mb-4">
              Vemos que para la primera imagen del conjunto de datos el mínimo de píxeles es 35 y el 
              máximo es 229.
            </p>

            <pre
              class="bg-base-100 rounded-lg text-left inline-block whitespace-pre margin-x-auto max-w-full overflow-x-auto"
            >
              <prism language="python" class="rounded-lg block">
  # Normalización de las imágenes dividiendo por 255 para que los valores estén en el rango [0,1]
  df["Imagen"] = df["Imagen"].apply(lambda x: x.astype(np.float32) / 255.0)

  # Eliminar columnas innecesarias para el análisis posterior
  df.drop(columns=["Dimensiones"], inplace=True)

  df.head()
              </prism>
            </pre>

            <p class="text-muted-foreground mb-4">
              Luego de escalar los píxeles obtenemos lo siguiente.
            </p>

            <pre
              class="bg-base-100 rounded-lg text-left inline-block whitespace-pre margin-x-auto max-w-full overflow-x-auto"
            >
              <prism language="python" class="rounded-lg block">
  print("Mínimo:", np.min(df["Imagen"].iloc[0] ))
  print("Máximo:", np.max(df["Imagen"].iloc[0] ))
  print("Media:", np.mean(df["Imagen"].iloc[0] ))
  print("Desviación estándar:", np.std(df["Imagen"].iloc[0] ))

  Mínimo: 0.13725491
  Máximo: 0.89411765
  Media: 0.54316
  Desviación estándar: 0.18921624
              </prism>
            </pre>

            <p class="text-muted-foreground mb-4">
              Vemos que para la primera imágen han cambiado las principales estadísticas y ahora se encuentran normalizadas.

              <br />
              <br />

              Ahora veamos esto gráficamente solo para la primera imágen.
            </p>

            <pre
              class="bg-base-100 rounded-lg text-left inline-block whitespace-pre margin-x-auto max-w-full overflow-x-auto"
            >
              <prism language="python" class="rounded-lg block">
  # Seleccionar una imagen del DataFrame
  imagen_new = df["Imagen"].iloc[0]  # Tomamos la primera imagen como ejemplo

  # Si la imagen es en color (RGB), la convertimos a escala de grises
  if imagen.ndim == 3 and imagen.shape[-1] == 3:  # Vetificar si la imagen es a color
      imagen_gris = cv2.cvtColor(imagen_new, cv2.COLOR_RGB2GRAY)  # Conversión a escala de grises
  else:
      imagen_gris = imagen_new  # Si ya está en escala de grises, se mantiene igual

  # Graficar el heatmap para visualizar la intensidad de los píxeles
  plt.figure(figsize=(8, 6))  # Definir tamaño de la figura
  sns.heatmap(imagen_gris, cmap="rocket", cbar=True)  # Crear heatmap con la escala de colores "rocket"
  plt.title("Mapa de Intensidad de Píxeles")  # Agregar título al gráfico
  plt.axis("off")  # Ocultar los ejes para una mejor visualización
  plt.show()
              </prism>
            </pre>

            <div class="flex flex-col items-center justify-center mb-8">
              <img
                src="@/assets/eda-images/mapa-de-intensidad-final.png"
                alt="Imagen de Osteoartritis"
                class="rounded-lg mb-2"
                width="400"
                height="600"
              />
            </div>

            <p class="text-muted-foreground mb-4">
              Evidentemente, observamos que la escala del mapa de calor ha cambiado, pero la 
              distribución y predominancia de los colores se han mantenido. Esto sugiere que el 
              escalamiento se realizó correctamente, preservando la estructura de la información 
              original sin alterar los patrones de intensidad en la imagen.
            </p>
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'performance'" class="card border rounded-lg shadow">
        <div class="card-header p-4 border-b">
          <h2 class="card-title text-xl font-semibold mb-4">
            Analisis de Desempeño del Modelo
          </h2>
          <p class="card-description text-muted-foreground">
            En esta sección se presentará el desempeño del modelo de clasificación de imágenes 
            desarrollado para detectar la osteoartritis de rodilla (KOA) a partir de radiografías. 
            Se utilizarán métricas como la precisión, la exactitud y la matriz de confusión para 
            evaluar su rendimiento.
          </p>
        </div>
        
        <div class="card-content p-6 grid gap-6">
          <div class="flex flex-col mt-6">
            <h3 class="text-lg font-medium mb-2">Matriz de Confusión</h3>
            <ul class="list-disc pl-5 space-y-1 text-muted-foreground">
              <li>
                <strong>Negativos predichos como negativos (Verdaderos negativos): 800</strong>
              </li>
              <li>
                <strong>Negativos predichos como positivos (Falsos positivos): 135</strong>
              </li>
              <li>
                <strong>Positivos predichos como negativos (Falsos negativos): 229</strong>
              </li>
              <li>
                <strong>Positivos predichos como positivos (Verdaderos positivos): 492</strong>
              </li>
            </ul>
          </div>

          <div class="flex flex-col mt-6">
            <h3 class="text-lg font-medium mb-2">Matriz de confusión normalizada</h3>
            <p class="text-muted-foreground mb-4">
              El modelo clasifica correctamente el 86% de los casos negativos y el 68% de los positivos, 
              mostrando mayor eficacia para detectar negativos. Aunque su rendimiento es más fuerte en 
              esa clase, también logra identificar una proporción significativa de positivos, lo que 
              refleja un desempeño razonablemente balanceado.
            </p>

            <pre
              class="bg-base-100 rounded-lg text-left inline-block whitespace-pre margin-x-auto max-w-full overflow-x-auto"
            >
              <prism language="python" class="rounded-lg block">
  cm = confusion_matrix(y_true, y_pred)
  plot_confusion_matrix(cm, classes=labels, normalize=False)
  plot_confusion_matrix(cm, classes=labels, normalize=True, title='Matriz de Confusión (Normalizada)')
              </prism>
            </pre>

            <div class="flex flex-row items-center justify-evenly mb-8">
              <img
                src="@/assets/eda-images/matriz-de-confusion.png"
                alt="Imagen de Osteoartritis"
                class="rounded-lg mb-2"
                width="500"
                height="600"
              />
              <img
                src="@/assets/eda-images/matriz-de-confusion-normalizada.png"
                alt="Imagen de Osteoartritis"
                class="rounded-lg mb-2"
                width="500"
                height="600"
              />
            </div>
          </div>

          <div class="flex flex-col mt-6">
            <h3 class="text-lg font-medium mb-2">Métricas</h3>

            <ul class="list-disc pl-5 space-y-1 text-muted-foreground">
              <li>
                Precisión: <strong>0.781</strong> 
              </li>
              <li>
                Recall (sensibilidad): <strong>0.780</strong>
              </li>
              <li>
                F1-score: <strong>0.778</strong>
              </li>
              <li>
                Exactitud (accuracy): <strong>0.780</strong>
              </li>
            </ul>

            <p class="text-muted-foreground mb-4">
              El modelo tiene un desempeño global sólido, con un F1-score ponderado de 0.778, lo que 
              indica un buen equilibrio entre precisión y recall. La precisión ponderada de 0.781 
              sugiere que el modelo clasifica correctamente una alta proporción de sus predicciones 
              positivas. En general, el modelo muestra un comportamiento estable y confiable, incluso 
              con un leve desbalance entre clases.
            </p>

            <pre
              class="bg-base-100 rounded-lg text-left inline-block whitespace-pre margin-x-auto max-w-full overflow-x-auto"
            >
              <prism language="python" class="rounded-lg block">
  from sklearn.metrics import classification_report, confusion_matrix
  print(classification_report(y_true, y_pred, target_names=['negative', 'positive'], digits=3))
              </prism>
            </pre>

            <div class="flex flex-col items-center justify-center mb-8">
              <img
                src="@/assets/eda-images/tabla-metricas.png"
                alt="Imagen de Osteoartritis"
                class="rounded-lg mb-2"
                width="500"
                height="600"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css' // o el tema que prefieras
import 'prismjs/components/prism-python' // Soporte para Python
import Prism from 'vue-prism-component'

import { Pie, Bar, Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

// Register ChartJS components
ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)

export default {
  name: 'EDAComponent',
  components: {
    Pie,
    Bar,
    Line,
    Prism,
  },
  data() {
    return {
      activeTab: 'contexto',
    }
  },
  methods: {
    // Puedes agregar métodos aquí si necesitas lógica adicional
  },
}
</script>

<style scoped>
.tab-trigger {
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  transition: all 0.2s;
}

.tab-trigger:hover:not(.active) {
  background-color: #f1f5f9;
}

.tab-trigger.active {
  border-color: #3b82f6;
}

.text-muted-foreground {
  color: #64748b;
}

/* Estilos adicionales para las tarjetas */
.card {
  transition: all 0.2s;
}

.card:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}
</style>
