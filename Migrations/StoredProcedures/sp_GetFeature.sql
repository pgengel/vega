USE [vega]
GO
/****** Object:  StoredProcedure [dbo].[sp_GetFeature]    Script Date: 2017/05/28 8:23:04 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[sp_GetFeature] 
AS
BEGIN

  SET NOCOUNT ON;
  --don't delete these variables
  DECLARE 
	@thisProc NVARCHAR(256) = N'dbo.sp_GetFeature', --used for error messages
    @tranCount INT = @@TRANCOUNT, --here we check if we are executing inside a tran
    @sysErrMsg VARCHAR(MAX),  -- used to set customised error messages
    @errSev INT, -- error severity
    @errState INT, -- error state
    @errMsg NVARCHAR(MAX); /*this is used to set an explanatory error message BEFORE you call something, 
                                   it is what we previously used to put inside our RAISERROR's*/

  BEGIN TRY
  
    IF(@tranCount = 0) --if we are not executing inside a tran, start one
    BEGIN
      BEGIN TRAN;
    END;
  
    SET @errmsg = N'[sp_GetFeature] - Failed to get to get the features.';

	SELECT 
		[Id]
		,[Name]
	FROM [vega].[dbo].[tb_CarFeature]
  
    IF(@tranCount = 0 AND XACT_STATE() = 1) --we assume we have started a tran above (it is also checked by the XACT_STATE() function)
    BEGIN  
      COMMIT TRAN;
    END;

    RETURN 0; 
  END TRY

  BEGIN CATCH
    --error handling code
    SELECT @sysErrMsg = ERROR_MESSAGE(), @errSev = ERROR_SEVERITY(), @errState = ERROR_STATE();
  
    IF(@tranCount = 0 AND XACT_STATE() != 0) --we assume we have started a tran above (it is also checked by the XACT_STATE() function)
    BEGIN
      ROLLBACK TRAN;
    END;
  
    --re-raise upstream
    RAISERROR('Error in %s: %s. %s.', @errSev, @errState, @thisProc, @errMsg, @sysErrMsg);
    
    RETURN;
  END CATCH
END;
