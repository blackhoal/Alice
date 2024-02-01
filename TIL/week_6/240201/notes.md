# 실습 추가 문제
```
1번 fullplot에 money라는 단어가 들어간 영화 찾기
{fullplot: {$regex: /money/}}

2번 genres가 Action, Comedy 두개 들어간 영화 찾기 
(여러개 더 들어가도 상관없지만 2개는 꼭 들어가야함) (배열) 
{genres: {$all:['Action', 'Comedy']}}

3번 imdb 값이 imdb.rating 5 이상이고 imdb votes 가 1000 이하인것
{$and: [{"imdb.rating" : {"$gte" : 5}}, {"imdb.votes" : {"$lte" : 1000}}]}
```