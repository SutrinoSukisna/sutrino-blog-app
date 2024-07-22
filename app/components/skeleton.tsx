const Skeleton = () => {
    return (
      <div className="skeleton">
        <style jsx>{`
          .skeleton {
            background-color: #e0e0e0;
            height: 20px;
            margin: 10px 0;
            border-radius: 4px;
          }
        `}</style>
      </div>
    );
  };
  
  export default Skeleton;