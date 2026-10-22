export const DRINKS = [
      {
        id: 'americano',
        number: '01',
        name: 'AMERICANO',
        scriptBadge: 'Iced',
        tagline: 'bold. black.<br/>fearless.',
        description: "Double-shot espresso over crystal ice. Zero noise, maximum caffeine — the purist's pick.",
        price: 4.50,
        flavorTag: 'DOUBLE RISTRETTO · ZERO SUGAR',
        image: '/assets/asset-01.png',
        colors: {
          bgPrimary: '#231008',
          bgSecondary: '#471B0C',
          leaf1: '#D35220',
          leaf2: '#8F3412',
          leaf3: '#4E1B09'
        },
        ribbonPath: 'M -30 165 C 210 155, 420 285, 650 495 C 790 620, 935 615, 1055 460 C 1150 335, 1345 360, 1375 450 C 1395 515, 1295 555, 1255 500 C 1210 440, 1295 350, 1465 390',
        showIce: true,
        ingredients: [
          { name: 'Double Espresso', icon: 'bean', detail: '18g freshly pulled double ristretto shot from 100% highland Arabica.' },
          { name: 'Crystal Ice', icon: 'ice', detail: 'Slow-frozen crystal clear artisan cubes that chill without rapid dilution.' },
          { name: 'Filtered Water', icon: 'water', detail: 'Triple-filtered remineralized spring water for a crisp, clean finish.' },
          { name: 'Zero Sugar', icon: 'zero', detail: '0g added sugar — pure roasted crema & dark caramel notes.' }
        ]
      },
      {
        id: 'latte',
        number: '02',
        name: 'LATTE',
        scriptBadge: 'Silky',
        tagline: 'silky. smooth.<br/>classic.',
        description: 'Bold espresso folded into fresh milk and velvet foam. The everyday hero, done right.',
        price: 5.20,
        flavorTag: 'VELVET MILK · DOUBLE ESPRESSO',
        image: '/assets/asset-03.png',
        colors: {
          bgPrimary: '#1D140E',
          bgSecondary: '#3A281A',
          leaf1: '#C89B64',
          leaf2: '#8B683F',
          leaf3: '#4A3620'
        },
        ribbonPath: 'M -30 620 C 230 605, 480 420, 710 365 C 910 320, 1110 455, 1285 455 C 1410 455, 1430 335, 1335 315 C 1245 295, 1240 430, 1480 440',
        showIce: false,
        ingredients: [
          { name: 'Bold Espresso', icon: 'bean', detail: 'Rich double-shot house espresso pulled at 9 bars of pressure.' },
          { name: 'Fresh Milk', icon: 'milk', detail: 'Chilled grass-fed whole milk or creamy barista oat milk.' },
          { name: 'Velvet Foam', icon: 'foam', detail: 'Micro-aerated silky cold foam cap that crowns every sip.' },
          { name: 'Light Ice', icon: 'ice', detail: 'Balanced ice ratio to preserve the creamy texture.' }
        ]
      },
      {
        id: 'mocha',
        number: '03',
        name: 'MOCHA',
        scriptBadge: 'Choco',
        tagline: 'dark. rich.<br/>decadent.',
        description: 'Espresso meets dark cocoa and steamed milk, dusted with cocoa. Dessert in disguise.',
        price: 5.80,
        flavorTag: '70% DARK COCOA · ESPRESSO BLEND',
        image: '/assets/asset-04.png',
        colors: {
          bgPrimary: '#1E0E09',
          bgSecondary: '#3E1C11',
          leaf1: '#B65B2B',
          leaf2: '#763617',
          leaf3: '#421C0B'
        },
        ribbonPath: 'M 495 360 C 425 460, 465 565, 575 555 C 675 545, 675 430, 585 385 C 485 335, 765 480, 965 460 C 1185 440, 1365 295, 1620 315',
        showIce: false,
        ingredients: [
          { name: 'Bold Espresso', icon: 'bean', detail: 'Full-bodied dark roast espresso that cuts through rich chocolate.' },
          { name: 'Dark Cocoa', icon: 'cocoa', detail: '70% single-origin Belgian dark chocolate ganache ribbon.' },
          { name: 'Steamed Milk', icon: 'milk', detail: 'Velvety textured milk folded seamlessly into warm cocoa.' },
          { name: 'Cocoa Dust', icon: 'dust', detail: 'Topped with raw Dutch-processed cocoa powder dusting.' }
        ]
      },
      {
        id: 'matcha',
        number: '04',
        name: 'MATCHA',
        scriptBadge: 'Earthy',
        tagline: 'vibrant. zen.<br/>creamy.',
        description: 'First-harvest Uji ceremonial matcha whisked with bamboo chasen over chilled milk and ice.',
        price: 5.60,
        flavorTag: 'FIRST HARVEST UJI · CEREMONIAL GRADE',
        image: '/assets/asset-05.png',
        colors: {
          bgPrimary: '#131C0E',
          bgSecondary: '#27381B',
          leaf1: '#7B9E44',
          leaf2: '#4D6927',
          leaf3: '#293A14'
        },
        ribbonPath: 'M -30 240 C 260 210, 490 480, 770 490 C 1020 500, 1180 310, 1350 350 C 1450 375, 1390 510, 1290 470 C 1200 435, 1320 330, 1590 360',
        showIce: true,
        ingredients: [
          { name: 'Ceremonial Uji', icon: 'matcha', detail: 'Stone-ground first-harvest green tea leaves from Uji, Kyoto.' },
          { name: 'Fresh Milk', icon: 'milk', detail: 'Silky cold milk base creating a dramatic emerald-and-cream layer.' },
          { name: 'Agave Nectar', icon: 'water', detail: 'Light touch of organic raw amber agave for natural balance.' },
          { name: 'Crystal Ice', icon: 'ice', detail: 'Artisan slow-melting ice cubes.' }
        ]
      },
      {
        id: 'caramel',
        number: '05',
        name: 'CARAMEL',
        scriptBadge: 'Golden',
        tagline: 'sweet. buttery.<br/>velvet.',
        description: 'Slow-steeped 72h cold brew crowned with salted caramel ribbons and vanilla sweet cream foam.',
        price: 5.90,
        flavorTag: 'SALTED CARAMEL · 72H COLD BREW',
        image: '/assets/asset-06.png',
        colors: {
          bgPrimary: '#211107',
          bgSecondary: '#46240D',
          leaf1: '#D88728',
          leaf2: '#8F5212',
          leaf3: '#4D2A08'
        },
        ribbonPath: 'M -30 490 C 240 530, 510 310, 780 440 C 1030 560, 1210 420, 1360 360 C 1450 325, 1440 465, 1330 465 C 1225 465, 1295 340, 1610 370',
        showIce: true,
        ingredients: [
          { name: '72h Cold Brew', icon: 'bean', detail: 'Small-batch cold brew steeped for 72 hours for zero bitterness.' },
          { name: 'Salted Caramel', icon: 'cocoa', detail: 'House-cooked burnt sugar caramel with flaky sea salt.' },
          { name: 'Vanilla Cream', icon: 'foam', detail: 'Cloud-like Madagascar vanilla bean cold foam cap.' },
          { name: 'Crystal Ice', icon: 'ice', detail: 'Slow-frozen crystal ice cubes.' }
        ]
      }
    ];

    