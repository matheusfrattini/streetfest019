# Fotos do projeto

Largue os arquivos aqui e aponte o caminho no arquivo de dados correspondente.
Enquanto o campo for `null`, o site mostra o bloco gráfico placeholder — nada quebra.

| Onde aparece            | Arquivo de dados   | Campo         | Recorte sugerido |
| ----------------------- | ------------------ | ------------- | ---------------- |
| Card e capa de evento   | `data/eventos.ts`  | `capa`        | 16:10            |
| Galeria do evento       | `data/eventos.ts`  | `galeria[]`   | 1:1              |
| Galeria por categoria   | `data/pilares.ts`  | `coverPhoto`  | 1:1              |
| Cards de projeto/frente | `data/frentes.ts`  | `coverPhoto`  | 16:10            |
| Retrato da equipe       | `data/equipe.ts`   | `foto`        | 1:1              |

Exemplo:

```ts
capa: "/fotos/street-taquaral-2025.jpg",
galeria: ["/fotos/taquaral-01.jpg", "/fotos/taquaral-02.jpg", null],
```

Recomendações: JPG ou WebP, lado maior entre 1600px e 2400px, abaixo de 500 KB.
O `next/image` gera os tamanhos menores sozinho.
