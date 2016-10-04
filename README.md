# String.prototype.*

String 클래스 상속 유틸 함수 구현

>https://github.com/mathiasbynens/String.prototype.startsWith  
를 참고하였습니다.

## Installation

Via npm:

```
npm install --save string.prototypes
```

Then, in Node.js:

```
require('./stringPrototypes');
```

## Usage

Source:

```
let str = "구글 주식회사는 미국의 다국적 기업이다. 1998년에 'BackRub'이라는 이름으로 설립했다. 구글은 미국 전체 인터넷 검색의 2/3, 전 세계의 70%를 장악했다. 2008년에 구글은 자사 웹 페이지 인덱스 크기가 1조 개를 돌파했다고 발표했으며 다른 어떤 검색 엔진보다도 3배 이상 큰 인덱스를 관리한다. 2009년 초 구글에서 매일 수십억 개의 검색 결과 페이지가 방문되고, 수백억 개의 구글 광고가 노출되었다.";

console.log( str.byteLength() );
console.log( str.byteCut(15) );
```

Result:

```
'구글 주식회사는 미국의...'
```

## Test

In Command-line:

```
npm test
```

## License

GPL v2.0

오래전부터 블로그들에 돌아다니는 소스를 NodeJS로 포팅했습니다.  
원작자분이 나타나시기 전까지 위 라이센스를 적용하도록 하겠습니다.
