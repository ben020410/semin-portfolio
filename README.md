# 원래 Vercel 주소로 배포하기

이 내보내기 폴더는 **표준 Next.js**로 빌드합니다. Sites의 Vinext/Cloudflare 설정, 로그인·연결 도구, 자격 증명은 포함하지 않습니다. 현재 Sites는 계속 비공개입니다. Vercel의 Production 배포는 원래 공개 홈페이지를 교체하는 단계이므로 직접 실행할 때만 적용됩니다.

## 같은 `semin-na.vercel.app` 주소 유지하기 — CLI

1. ZIP을 별도 폴더에 풀고 Node.js 22 LTS와 npm을 설치합니다. 기존 Astro 폴더에 덮어쓰지 않습니다.
2. 해당 폴더에서 터미널을 열고 다음을 실행합니다.

```sh
npm install
npm run build
npx vercel login
npx vercel link
```

`vercel link`에서 원래 홈페이지를 소유한 계정/팀을 선택하고 **기존 프로젝트 연결**을 선택합니다. Vercel 대시보드의 Domains에 `semin-na.vercel.app`이 등록된 프로젝트를 고릅니다. 새 프로젝트를 만들면 주소가 달라집니다.

3. 기존 Vercel 프로젝트의 Settings → Build and Deployment에서 아래 값을 확인합니다. 기존 Astro 설정이나 수동 override가 남아 있으면 바꿉니다.

| 설정 | 값 |
| --- | --- |
| Framework Preset | Next.js |
| Root Directory | 프로젝트 루트 (비워두기) |
| Build Command | `npm run build` |
| Install Command | `npm install` |
| Output Directory | Next.js 기본값 (수동 override 끄기) |
| Node.js Version | 22.x |

4. 먼저 프리뷰로 배포하고 출력된 URL에서 메뉴, 슬라이드, 자료 링크를 확인합니다.

```sh
npx vercel
```

5. 확인 후 같은 폴더에서 다음을 실행하면 기존 프로젝트의 Production 주소에 적용됩니다.

```sh
npx vercel --prod
```

`semin-na.vercel.app`은 Vercel이 부여한 주소이므로 Sites 주소에 DNS로 연결하는 방식이 아니라, **그 주소를 가진 기존 Vercel 프로젝트에 배포**하는 방식입니다.

## 이후 GitHub 자동 배포를 쓸 경우

기존 레포의 별도 브랜치에서 Astro 버전을 보관한 뒤 이 ZIP의 Next.js 파일 구성으로 옮깁니다. 기존 `astro.config.*`, Astro용 `src/`, 이전 lockfile을 정리하고 `npm install`로 새 lockfile을 생성합니다. Vercel Git 설정에서 연결된 레포와 Production Branch를 확인합니다. 프리뷰 배포를 검토한 뒤 Production Branch에 병합합니다. 이 작업에서는 원래 GitHub 레포를 수정하지 않았습니다.

CLI 배포만 했을 때 기존 Astro 레포가 계속 연결되어 있으면, 그 레포의 다음 Production push가 예전 사이트를 다시 배포할 수 있습니다. 홈페이지 전환 후에는 Git 연결도 새 코드와 맞춰 둡니다.

## 수정 위치

- 프로젝트 내용·자료·정렬 날짜: `lib/projects.ts`
- 자동 슬라이드: `components/recent-projects.tsx` (현재 6초 간격)
- 프로젝트 상세·사진 배치: `components/project-details.tsx`
- 로고: `public/favicon.svg`
- 사진·PDF·영상: `public/images/`, `public/materials/`
- Vercel 버전은 검색 노출을 원하면 `app/layout.tsx`의 `robots`를 `index: true, follow: true`로 수정합니다. 현재는 기존 요청대로 검색 색인을 꺼둔 상태입니다.

공식 참고: https://vercel.com/docs/cli/project-linking · https://vercel.com/docs/builds/configure-a-build · https://vercel.com/docs/projects/deploy-from-cli
