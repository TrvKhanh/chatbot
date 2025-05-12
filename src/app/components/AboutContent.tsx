import React from 'react';

const AboutContent: React.FC = () => (
  <div className="w-full flex flex-col items-center justify-center">
    <div className="w-full max-w-2xl">
      <h1 className="text-4xl font-extrabold mb-6">Hello World</h1>
      <p className="mb-4 text-lg">Một blog bình thường thì nên có gì?</p>
      <p className="mb-4">Mình không biết. Đó cũng là lí do tại sao bạn có thể tìm được ở đây những dòng tâm sự trong những ngày mưa bất chợt bên ly cà phê nóng hay những dòng code vào lúc nửa đêm.</p>
      <p className="mb-4">Mình đã nhen nhóm ý tưởng về một blog cá nhân từ lâu. Mình nghĩ ý tưởng đó ít nhiều chịu ảnh hưởng từ phong trào blog từng rất thịnh hành ở Việt Nam trước khi mạng xã hội trở nên phổ biến. Mình tạo blog đầu tiên vào năm lớp 10, nhưng sau đó đã để nó mốc meo trong hơn hai năm. Lúc đó mình chưa biết mình nên viết những gì và viết như thế nào. Sau này, khi những trải nghiệm của mình dần đa dạng hơn và những cảm xúc cũng dần phức tạp, khó diễn tả thành lời hơn, mình lại tìm đến cây viết, và sau này là bàn phím.</p>
      <p className="mb-4">Mình viết để những suy nghĩ trở nên rõ ràng, để những trải nghiệm được lưu giữ, và để nhắc mình không lãng quên những gì mình đã và đang có.</p>
      <p className="mb-4 font-semibold italic underline">Mình dạo này thế nào?</p>
      <hr className="mt-6" />
    </div>
  </div>
);

export default AboutContent; 