// mockData.ts

export interface ProfileData {
    imageUrl: string;
    name: string;
    role: string;
    githubLink: string;
    linkedinLink: string;
    }

    const mockData: ProfileData = {
    imageUrl: 'https://media.licdn.com/dms/image/D4D03AQELiYTc8y4GbA/profile-displayphoto-shrink_200_200/0/1711450226000?e=1721865600&v=beta&t=p0-mwNdODAlDQeqL4xotDEpDKMvVC4Vx78BiAtmWYco',
    name: 'Larissa Albuquerque',
    role: 'Desenvolvedora Frontend',
    githubLink: 'https://github.com/larialbu',
    linkedinLink: 'https://www.linkedin.com/in/larissa-albuquerque-39133a239/'
    };

    const mockData1: ProfileData = {
    imageUrl: 'https://media.licdn.com/dms/image/D4D03AQF-ZKWdz68oDg/profile-displayphoto-shrink_200_200/0/1694780200621?e=1721865600&v=beta&t=3TWQEyl2nhhGeNBAhcrG5ES9vVvmZrzZ2JoKCtJqK7w',
    name: 'Klecio Henrique',
    role: 'Desenvolvedor Backend',
    githubLink: 'https://github.com/klecio-lab',
    linkedinLink: 'https://www.linkedin.com/in/klecio-henrique-7bba53214/'
    };

    const mockData2: ProfileData = {
    imageUrl: 'https://media.licdn.com/dms/image/D4D03AQFHc9eVUH7F8w/profile-displayphoto-shrink_800_800/0/1710162463686?e=1721865600&v=beta&t=S7dA0w0eUw0ifImDHfEsBGhKThTcmlkdOAwF3WCF7IQ',
    name: 'Maynan Taize',
    role: 'Designer UX/UI',
    githubLink: '',
    linkedinLink: 'https://www.linkedin.com/in/pedro-santos'
    };

    const mockData3: ProfileData = {
    imageUrl: 'https://media.licdn.com/dms/image/D5603AQEYA0BHqeGQ7w/profile-displayphoto-shrink_200_200/0/1706111398969?e=1721865600&v=beta&t=KFBHijJ-TOgDwpYAK_Uv26dVcR-bTO5kxDdAVHPQpmk',
    name: 'Gabriel José',
    role: 'Engenheiro de Dados',
    githubLink: 'https://github.com/Gabrieljoseg',
    linkedinLink: 'https://www.linkedin.com/in/gabrie-jose-gomes/'
    };

    const mockData4: ProfileData = {
    imageUrl: 'https://media.licdn.com/dms/image/D4D03AQGn9cLJkfK66Q/profile-displayphoto-shrink_200_200/0/1696010702444?e=1721865600&v=beta&t=mUkmKG8t6yS0K4OtpYB6xQrvIPccIRp97Ku0eMAeNcU',
    name: 'Aryel Miguel',
    role: 'Arquiteto de Software',
    githubLink: '',
    linkedinLink: 'https://www.linkedin.com/in/aryel-miguel-7a4309204/'
    };

    const mockData5: ProfileData = {
    imageUrl: 'https://media.licdn.com/dms/image/D4E03AQF-JI6ilNuqlA/profile-displayphoto-shrink_200_200/0/1712778443205?e=1721865600&v=beta&t=uhj8iSfOycVhue0S5MlHbMgkKaaEdwkD91BnaZRsvzA',
    name: 'Elizabeth Kristen',
    role: 'Arquiteta de Software',
    githubLink: '',
    linkedinLink: 'https://www.linkedin.com/in/elizabeth-kristen/'
    };

    const mockData6: ProfileData = {
    imageUrl: 'https://media.licdn.com/dms/image/D4D03AQHqVHy5bpsI-Q/profile-displayphoto-shrink_200_200/0/1690293832452?e=1721865600&v=beta&t=Tyrxp_UiQd3XNF7ACE_lDhHyJ_80-HLICtlNu6tPpCE',
    name: 'Ewellyn Lira',
    role: 'Desenvolvedora Backend',
    githubLink: '',
    linkedinLink: 'https://www.linkedin.com/in/rafael-costa'
    };

    export const mockDataList: ProfileData[] = [mockData, mockData1, mockData2, mockData3, mockData4, mockData5, mockData6];

export default mockData;